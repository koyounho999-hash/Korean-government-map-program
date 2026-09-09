/**
 * app.js
 * 해시 라우팅 기반 SPA
 *  #/                → 홈(전체 지도)
 *  #/city/{id}       → 도시 상세
 *  #/location/{id}   → 장소 상세(3D 뷰 + 관련 영상)
 *  #/videos          → 전체 관련 영상 모음
 */

(function () {
  "use strict";

  const $ = (sel, root) => (root || document).querySelector(sel);
  const $all = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  const views = {
    home: $("#view-home"),
    city: $("#view-city"),
    location: $("#view-location"),
    videos: $("#view-videos"),
  };

  let homeMap = null;
  let cityMap = null;

  function findCity(id) {
    return IMSI_DATA.cities.find((c) => c.id === id);
  }
  function findLocation(id) {
    for (const city of IMSI_DATA.cities) {
      const loc = city.locations.find((l) => l.id === id);
      if (loc) return { city, loc };
    }
    return null;
  }

  /* ---------------- 라우팅 ---------------- */

  function navigate(hash) {
    window.location.hash = hash;
  }

  function handleRoute() {
    const hash = window.location.hash.replace(/^#\/?/, "");
    const parts = hash.split("/").filter(Boolean);

    if (parts[0] === "city" && parts[1]) {
      showCity(parts[1]);
    } else if (parts[0] === "location" && parts[1]) {
      showLocation(parts[1]);
    } else if (parts[0] === "videos") {
      showVideos();
    } else {
      showHome();
    }
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }

  function setActiveView(name) {
    Object.entries(views).forEach(([key, el]) => {
      el.classList.toggle("active", key === name);
    });
  }

  function setBreadcrumb(crumbs) {
    // crumbs: [{label, nav}] — nav = hash target ('' for home) ; last crumb has no nav
    const el = $("#breadcrumb-path");
    el.innerHTML = "";
    crumbs.forEach((c, i) => {
      if (i > 0) {
        const sep = document.createElement("span");
        sep.className = "sep";
        sep.textContent = "›";
        el.appendChild(sep);
      }
      const span = document.createElement("span");
      span.className = "crumb" + (c.nav === undefined ? " current" : "");
      span.textContent = c.label;
      if (c.nav !== undefined) {
        span.addEventListener("click", () => navigate(c.nav));
      }
      el.appendChild(span);
    });
  }

  /* ---------------- 홈 뷰 ---------------- */

  function initHomeMap() {
    if (homeMap) return;
    homeMap = L.map("map", { scrollWheelZoom: false }).setView([28.5, 113], 4);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
      maxZoom: 18,
    }).addTo(homeMap);

    const bounds = [];
    IMSI_DATA.cities.forEach((city) => {
      const icon = L.divIcon({ className: "leaflet-taeguk-pin", iconSize: [26, 26] });
      const marker = L.marker([city.lat, city.lng], { icon }).addTo(homeMap);
      marker.bindTooltip(`${city.name} (${city.period})`, { direction: "top" });
      marker.on("click", () => navigate(`/city/${city.id}`));
      bounds.push([city.lat, city.lng]);
    });

    // 이동 경로 선
    const path = IMSI_DATA.cities.map((c) => [c.lat, c.lng]);
    L.polyline(path, { color: "#c53a3a", weight: 2, dashArray: "5,6", opacity: 0.8 }).addTo(homeMap);

    if (bounds.length) homeMap.fitBounds(bounds, { padding: [30, 30] });
  }

  function renderCityGrid() {
    const grid = $("#city-grid");
    grid.innerHTML = "";
    IMSI_DATA.cities.forEach((city) => {
      const card = document.createElement("div");
      card.className = "city-card";
      card.innerHTML = `
        <div class="name">${city.name}<span class="hanja">${city.hanja}</span></div>
        <div class="period">${city.period}</div>
      `;
      card.addEventListener("click", () => navigate(`/city/${city.id}`));
      grid.appendChild(card);
    });
  }

  function showHome() {
    setActiveView("home");
    setBreadcrumb([{ label: "지도" }]);
    initHomeMap();
    setTimeout(() => homeMap && homeMap.invalidateSize(), 50);
    renderCityGrid();
  }

  /* ---------------- 도시 뷰 ---------------- */

  function showCity(cityId) {
    const city = findCity(cityId);
    if (!city) return navigate("/");

    setActiveView("city");
    setBreadcrumb([{ label: "지도", nav: "" }, { label: city.name }]);

    $("#city-hero").innerHTML = `
      <div class="name-row">
        <h2>${city.name}</h2>
        <span class="hanja">${city.hanja}</span>
      </div>
      <div class="period">${city.period}</div>
      <p>${city.summary}</p>
    `;

    // 도시 지도 (매번 재생성 — 서로 다른 도시로 이동할 때 문제 없도록)
    if (cityMap) {
      cityMap.remove();
      cityMap = null;
    }
    cityMap = L.map("city-map", { scrollWheelZoom: false }).setView([city.lat, city.lng], 12);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
      maxZoom: 18,
    }).addTo(cityMap);

    const bounds = [];
    city.locations.forEach((loc) => {
      const icon = L.divIcon({ className: "leaflet-loc-pin", iconSize: [16, 16] });
      const marker = L.marker([loc.lat, loc.lng], { icon }).addTo(cityMap);
      marker.bindTooltip(loc.name, { direction: "top" });
      marker.on("click", () => navigate(`/location/${loc.id}`));
      bounds.push([loc.lat, loc.lng]);
    });
    if (bounds.length) cityMap.fitBounds(bounds, { padding: [40, 40] });
    setTimeout(() => cityMap && cityMap.invalidateSize(), 50);

    const grid = $("#location-grid");
    grid.innerHTML = "";
    city.locations.forEach((loc) => {
      const card = document.createElement("div");
      card.className = "location-card";
      card.innerHTML = `
        <div class="name">${loc.name}</div>
        <div class="hanja">${loc.hanja || ""}</div>
        <div class="period">${loc.period}</div>
        <p>${loc.desc}</p>
      `;
      card.addEventListener("click", () => navigate(`/location/${loc.id}`));
      grid.appendChild(card);
    });
  }

  /* ---------------- 장소 상세 뷰 ---------------- */

  function buildStreetViewUrl(lat, lng) {
    const key = (window.APP_CONFIG && APP_CONFIG.GOOGLE_MAPS_API_KEY) || "";
    if (key) {
      return `https://www.google.com/maps/embed/v1/streetview?key=${key}&location=${lat},${lng}&heading=0&pitch=0&fov=90`;
    }
    // API 키 없이 동작하는 대체 스트리트뷰 임베드
    return `https://maps.google.com/maps?layer=c&cbll=${lat},${lng}&cbp=11,0,0,0,0&output=svembed`;
  }

  function showLocation(locId) {
    const found = findLocation(locId);
    if (!found) return navigate("/");
    const { city, loc } = found;

    setActiveView("location");
    setBreadcrumb([
      { label: "지도", nav: "" },
      { label: city.name, nav: `/city/${city.id}` },
      { label: loc.name },
    ]);

    $("#location-hero").innerHTML = `
      <h2>${loc.name}</h2>
      <span class="hanja">${loc.hanja || ""}</span>
      <div class="period">${loc.period}</div>
      <p class="desc">${loc.desc}</p>
    `;

    // 3D 뷰(스트리트뷰) 리셋
    const frame = $("#streetview-frame");
    const fallback = $("#streetview-fallback");
    const btn = $("#btn-streetview");
    frame.classList.remove("active");
    frame.src = "";
    fallback.classList.remove("active");

    const key = (window.APP_CONFIG && APP_CONFIG.GOOGLE_MAPS_API_KEY) || "";
    btn.onclick = () => {
      frame.src = buildStreetViewUrl(loc.lat, loc.lng);
      frame.classList.add("active");
      if (!key) {
        fallback.classList.add("active");
        fallback.innerHTML = `스트리트뷰가 보이지 않는다면 <a href="https://www.google.com/maps/search/?api=1&query=${loc.lat},${loc.lng}" target="_blank" rel="noopener">구글 지도에서 직접 열기</a>를 이용하세요.`;
      }
    };

    // 관련 영상: 이 장소의 도시(cityId)와 일치하거나 cityId가 없는(전체) 영상
    const relevant = IMSI_DATA.videos.filter((v) => v.cityId === city.id || !v.cityId);
    renderVideoGrid($("#location-video-grid"), relevant, "이 장소와 관련된 영상이 아직 없습니다.");
  }

  /* ---------------- 영상 ---------------- */

  function videoThumbUrl(v) {
    if (v.type === "youtube") {
      return `https://img.youtube.com/vi/${v.videoId}/hqdefault.jpg`;
    }
    return v.thumbnail || "";
  }

  function renderVideoGrid(container, list, emptyMsg) {
    container.innerHTML = "";
    if (!list.length) {
      container.innerHTML = `<p class="hint">${emptyMsg}</p>`;
      return;
    }
    list.forEach((v) => {
      const card = document.createElement("div");
      card.className = "video-card";
      card.innerHTML = `
        <div class="video-thumb" style="background-image:url('${videoThumbUrl(v)}')">
          <span class="play">
            <svg viewBox="0 0 68 48" aria-hidden="true">
              <path d="M66.5 7.5S65.2 2.6 61.4 0.7C56.6-1 34 -1 34 -1s-22.6 0-27.4 1.7C2.8 2.6 1.5 7.5 1.5 7.5S0 13.4 0 19.3v9.4c0 5.9 1.5 11.8 1.5 11.8s1.3 4.9 5.1 6.7C11.4 49 34 49 34 49s22.6 0 27.4-1.8c3.8-1.8 5.1-6.7 5.1-6.7S68 34.6 68 28.7v-9.4c0-5.9-1.5-11.8-1.5-11.8z" fill="#c53a3a" transform="translate(0,-1)"/>
              <path d="M27 14 L46 24 L27 34 Z" fill="#fffdf7"/>
            </svg>
          </span>
        </div>
        <div class="video-meta">
          <div class="title">${v.title}</div>
          <div class="channel">${v.channel || ""}</div>
          ${v.cityId ? `<span class="tag">${(findCity(v.cityId) || {}).name || ""}</span>` : ""}
        </div>
      `;
      card.addEventListener("click", () => window.open(v.link, "_blank", "noopener"));
      container.appendChild(card);
    });
  }

  function showVideos() {
    setActiveView("videos");
    setBreadcrumb([{ label: "지도", nav: "" }, { label: "관련 영상 보기" }]);
    renderVideoGrid($("#all-video-grid"), IMSI_DATA.videos, "등록된 영상이 없습니다.");
  }

  /* ---------------- 초기화 ---------------- */

  $all("[data-nav]").forEach((el) => {
    el.addEventListener("click", () => {
      const target = el.getAttribute("data-nav");
      navigate(target === "home" ? "/" : `/${target}`);
    });
  });

  window.addEventListener("hashchange", handleRoute);
  window.addEventListener("DOMContentLoaded", handleRoute);
})();
