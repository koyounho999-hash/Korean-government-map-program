/**
 * data.js
 * 대한민국 임시정부(1919~1945) 이동 경로 데이터
 * 좌표는 오늘날 지도 위 대략적인 위치입니다(교육/전시용). 실제 사료와 대조해 보정해 사용하세요.
 */

const IMSI_DATA = {
  cities: [
    {
      id: "shanghai",
      name: "상하이",
      hanja: "上海",
      period: "1919 – 1932",
      lat: 31.2304,
      lng: 121.4737,
      summary:
        "3·1운동 직후 국내외 독립운동 세력이 모여 대한민국 임시정부를 수립한 곳입니다. 프랑스 조계 지역을 중심으로 13년간 임시정부의 기틀을 다졌습니다.",
      locations: [
        {
          id: "shanghai-madangno",
          name: "마당로 임시정부 청사",
          hanja: "馬當路 청사",
          lat: 31.2107,
          lng: 121.4726,
          period: "1926 – 1932",
          desc:
            "임시정부가 가장 오랫동안 사용한 청사로, 현재는 복원되어 '대한민국임시정부 구지 진열관'으로 공개되어 있습니다. 김구 등 요인들이 국무회의를 열던 공간입니다.",
        },
        {
          id: "shanghai-independence-hq",
          name: "상해 대한인거류민단",
          hanja: "上海 大韓人居留民團",
          lat: 31.219,
          lng: 121.4657,
          period: "1919 – 1932",
          desc:
            "상하이 교민 사회를 조직하고 임시정부의 재정·행정을 뒷받침한 자치 기구가 있던 지역입니다.",
        },
        {
          id: "shanghai-hongkou",
          name: "훙커우 공원 의거지",
          hanja: "虹口公園",
          lat: 31.2649,
          lng: 121.4826,
          period: "1932",
          desc:
            "윤봉길 의사의 의거가 일어난 장소로, 이 사건 이후 일제의 추격이 심해져 임시정부는 상하이를 떠나 이동을 시작합니다.",
        },
      ],
    },
    {
      id: "hangzhou",
      name: "항저우",
      hanja: "杭州",
      period: "1932",
      lat: 30.2741,
      lng: 120.1551,
      summary:
        "윤봉길 의거 직후 일제의 추적을 피해 임시정부가 처음 옮겨간 곳입니다. 짧은 기간이었지만 정부 조직을 유지하며 다음 이동을 준비했습니다.",
      locations: [
        {
          id: "hangzhou-chengtai",
          name: "청태 제2여사(호텔) 임시 청사",
          hanja: "淸泰 第二旅社",
          lat: 30.2436,
          lng: 120.1685,
          period: "1932",
          desc:
            "임시정부 요인들이 여관을 임시 청사로 삼아 국무회의를 이어간 곳으로 알려져 있습니다.",
        },
        {
          id: "hangzhou-west-lake",
          name: "시후(서호) 일대 은신처",
          hanja: "西湖",
          lat: 30.259,
          lng: 120.1494,
          period: "1932",
          desc:
            "김구 등 일부 요인들이 신변 보호를 위해 흩어져 지내며 연락망을 유지했던 지역입니다.",
        },
      ],
    },
    {
      id: "zhenjiang",
      name: "전장(진강)",
      hanja: "鎭江",
      period: "1935 – 1937",
      lat: 32.1892,
      lng: 119.4515,
      summary:
        "국무위원회를 비롯한 임시정부 조직을 정비하고, 여러 독립운동 정당의 통합 논의가 이루어진 시기입니다.",
      locations: [
        {
          id: "zhenjiang-office",
          name: "전장 임시정부 판공처",
          hanja: "鎭江 辦公處",
          lat: 32.1975,
          lng: 119.4548,
          period: "1935 – 1937",
          desc:
            "국무위원들이 사무를 보던 곳으로, 이 시기 한국국민당 등 정당 활동도 함께 이루어졌습니다.",
        },
      ],
    },
    {
      id: "changsha",
      name: "창사",
      hanja: "長沙",
      period: "1937 – 1938",
      lat: 28.2282,
      lng: 112.9388,
      summary:
        "중일전쟁 발발로 난징이 위협받자 내륙 깊숙이 이동한 첫 도시입니다. 이곳에서 임시정부 요인이 총격을 당하는 남목청 사건이 일어나기도 했습니다.",
      locations: [
        {
          id: "changsha-seowonbukri",
          name: "서원북리 청사",
          hanja: "西園北里",
          lat: 28.1925,
          lng: 112.9718,
          period: "1937 – 1938",
          desc: "가족을 포함한 임시정부 대가족이 함께 머물던 거처이자 임시 청사였습니다.",
        },
        {
          id: "changsha-nammokcheong",
          name: "남목청 사건 현장",
          hanja: "南木廳",
          lat: 28.185,
          lng: 112.966,
          period: "1938",
          desc:
            "정당 통합을 논의하던 중 총격 사건이 벌어져 김구가 중상을 입었던 장소입니다.",
        },
      ],
    },
    {
      id: "guangzhou",
      name: "광저우",
      hanja: "廣州",
      period: "1938",
      lat: 23.1291,
      lng: 113.2644,
      summary:
        "일본군의 진격을 피해 남하한 짧은 체류지로, 곧이어 류저우로 다시 이동하게 됩니다.",
      locations: [
        {
          id: "guangzhou-dongsan",
          name: "동산백원 임시 청사",
          hanja: "東山栢園",
          lat: 23.1215,
          lng: 113.3013,
          period: "1938",
          desc: "대가족이 잠시 머물며 다음 피난처를 준비했던 곳입니다.",
        },
      ],
    },
    {
      id: "liuzhou",
      name: "류저우",
      hanja: "柳州",
      period: "1938",
      lat: 24.3264,
      lng: 109.4281,
      summary:
        "일본군 공습이 이어지는 가운데 강 위 배 위에서 지내는 등 극도로 어려운 피난 생활을 이어간 시기입니다.",
      locations: [
        {
          id: "liuzhou-riverboat",
          name: "류장 강변 피난처",
          hanja: "柳江",
          lat: 24.3282,
          lng: 109.4118,
          period: "1938",
          desc:
            "잦은 공습을 피해 배와 강변 임시 거처를 오가며 생활한 곳으로 전해집니다.",
        },
      ],
    },
    {
      id: "qijiang",
      name: "치장(기강)",
      hanja: "綦江",
      period: "1939",
      lat: 29.0296,
      lng: 106.6547,
      summary:
        "충칭 정착 직전, 흩어져 있던 임시정부 대가족이 다시 모여 재정비한 곳입니다.",
      locations: [
        {
          id: "qijiang-family",
          name: "치장 임시 거류지",
          hanja: "綦江 居留地",
          lat: 29.033,
          lng: 106.652,
          period: "1939",
          desc:
            "충칭 이전을 앞두고 여러 지역에 흩어졌던 임시정부 가족들이 다시 합류한 지역입니다.",
        },
      ],
    },
    {
      id: "chongqing",
      name: "충칭",
      hanja: "重慶",
      period: "1940 – 1945",
      lat: 29.563,
      lng: 106.576,
      summary:
        "임시정부가 광복을 맞이할 때까지 머문 마지막 정착지입니다. 한국광복군을 창설하고 건국강령을 제정하는 등 활동이 가장 활발했던 시기입니다.",
      locations: [
        {
          id: "chongqing-lianhuachi",
          name: "롄화츠(연화지) 청사",
          hanja: "蓮花池 청사",
          lat: 29.5605,
          lng: 106.5732,
          period: "1940 – 1945",
          desc:
            "임시정부의 마지막 청사로, 오늘날 복원되어 '대한민국임시정부 구지 진열관'으로 운영되고 있습니다.",
        },
        {
          id: "chongqing-kwangbokgun",
          name: "한국광복군 총사령부 터",
          hanja: "韓國光復軍 總司令部",
          lat: 29.558,
          lng: 106.5785,
          period: "1940",
          desc: "1940년 한국광복군이 창설된 곳으로, 정규 무장 독립군의 출발점입니다.",
        },
        {
          id: "chongqing-declaration",
          name: "대한민국 건국강령 선포지",
          hanja: "建國綱領",
          lat: 29.5615,
          lng: 106.575,
          period: "1941",
          desc:
            "광복 이후 세울 나라의 청사진이 된 건국강령이 발표된 곳으로 전해집니다.",
        },
      ],
    },
  ],

  /**
   * 관련 영상 데이터
   * type: "youtube" | "external"
   * youtube: videoId 를 넣으면 썸네일이 자동 생성됩니다.
   * external: thumbnail 이미지 URL을 직접 넣어주세요.
   * ▶ 아래 항목은 예시입니다. 실제 서비스 시에는 저작권을 확인한 실제 영상 ID/링크로 교체하세요.
   */
  videos: [
    {
      id: "v1",
      type: "youtube",
      videoId: "4H6nZUFxNbo",
      title: "대한민국임시정부 수립 100주년 다큐멘터리 (예시)",
      channel: "예시 채널",
      cityId: "shanghai",
      link: "https://www.youtube.com/watch?v=4H6nZUFxNbo",
    },
    {
      id: "v2",
      type: "youtube",
      videoId: "5MgBikgcWnY",
      title: "한국광복군과 충칭 임시정부 (예시)",
      channel: "예시 채널",
      cityId: "chongqing",
      link: "https://www.youtube.com/watch?v=5MgBikgcWnY",
    },
    {
      id: "v3",
      type: "youtube",
      videoId: "1La4QzGeaaQ",
      title: "임시정부의 이동 경로, 상하이에서 충칭까지 (예시)",
      channel: "예시 채널",
      cityId: null,
      link: "https://www.youtube.com/watch?v=1La4QzGeaaQ",
    },
  ],
};
