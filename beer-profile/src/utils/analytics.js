// ================================================
// 오늘의 맥주 — Google Analytics 이벤트 트래킹
// ================================================
// 사용법: import { track } from '../utils/analytics'
//         track.screenView('HomePage')
//         track.tapBeer({ id: beer.id, name: beer.name, category: beer.category })

const gtag = (...args) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag(...args);
  }
};

export const track = {

  /* ── 화면 진입 ────────────────────────────── */
  screenView(screenName) {
    gtag("event", "screen_view", {
      screen_name: screenName,
    });
  },

  /* ── 탭 전환 ──────────────────────────────── */
  tabChange(tab) {
    gtag("event", "tab_change", {
      tab_name: tab,
    });
  },

  /* ── 홈 화면 ──────────────────────────────── */
  tapRecommendedBeer(beer) {
    gtag("event", "tap_recommended_beer", {
      beer_id:       beer.id,
      beer_name:     beer.name,
      beer_category: beer.category,
    });
  },
  tapDrinkBtn(beer) {
    gtag("event", "tap_drink_btn", {
      beer_id:   beer.id,
      beer_name: beer.name,
    });
  },
  tapNews(newsTitle) {
    gtag("event", "tap_news", { news_title: newsTitle });
  },
  tapLevelCard() {
    gtag("event", "tap_level_card");
  },
  tapSearchIcon() {
    gtag("event", "tap_search_icon");
  },
  tapBarcodeIcon() {
    gtag("event", "tap_barcode_icon");
  },

  /* ── 검색 모달 ────────────────────────────── */
  search(query, resultCount) {
    gtag("event", "search", {
      search_term:   query,
      result_count:  resultCount,
    });
  },
  searchSelect(beer) {
    gtag("event", "search_select", {
      beer_id:       beer.id,
      beer_name:     beer.name,
      beer_category: beer.category,
    });
  },
  searchNoResult(query) {
    gtag("event", "search_no_result", { search_term: query });
  },

  /* ── 맥주 액션 시트 ───────────────────────── */
  actionSheetOpen(beer) {
    gtag("event", "action_sheet_open", {
      beer_id:   beer.id,
      beer_name: beer.name,
    });
  },
  actionSheetChooseReview(beer) {
    gtag("event", "action_sheet_choose_review", {
      beer_id:   beer.id,
      beer_name: beer.name,
    });
  },
  actionSheetChoosePost(beer) {
    gtag("event", "action_sheet_choose_post", {
      beer_id:   beer.id,
      beer_name: beer.name,
    });
  },

  /* ── 탐색 화면 ────────────────────────────── */
  tapCategoryFilter(category) {
    gtag("event", "tap_category_filter", { category });
  },
  tapExploreBeer(beer) {
    gtag("event", "tap_explore_beer", {
      beer_id:       beer.id,
      beer_name:     beer.name,
      beer_category: beer.category,
    });
  },

  /* ── 맥주 상세 ────────────────────────────── */
  beerDetailView(beer) {
    gtag("event", "beer_detail_view", {
      beer_id:       beer.id,
      beer_name:     beer.name,
      beer_category: beer.category,
    });
  },
  tapStartRating(beer) {
    gtag("event", "tap_start_rating", {
      beer_id:   beer.id,
      beer_name: beer.name,
    });
  },

  /* ── 평가 플로우 ──────────────────────────── */
  ratingStepEnter(step, beer) {
    // step: "input" | "detail" | "result"
    gtag("event", "rating_step_enter", {
      step,
      beer_id:   beer?.id,
      beer_name: beer?.name,
    });
  },
  ratingStepExit(step, beer) {
    gtag("event", "rating_step_exit", {
      step,
      beer_id:   beer?.id,
      beer_name: beer?.name,
    });
  },
  ratingComplete(beer, starRating, hashtags) {
    gtag("event", "rating_complete", {
      beer_id:        beer?.id,
      beer_name:      beer?.name,
      beer_category:  beer?.category,
      star_rating:    starRating,
      hashtag_count:  hashtags?.length ?? 0,
      hashtags:       hashtags?.join(",") ?? "",
    });
  },

  /* ── 커뮤니티 ─────────────────────────────── */
  tapLikePost(postId) {
    gtag("event", "tap_like_post", { post_id: postId });
  },
  tapWritePost() {
    gtag("event", "tap_write_post");
  },
  postComplete(hasBeerTag, mediaCount) {
    gtag("event", "post_complete", {
      has_beer_tag: hasBeerTag,
      media_count:  mediaCount,
    });
  },
  postAbandoned() {
    gtag("event", "post_abandoned");
  },

  /* ── 프로필 ───────────────────────────────── */
  tapFollowers() {
    gtag("event", "tap_followers");
  },
  tapFollowing() {
    gtag("event", "tap_following");
  },
  tapOtherProfile(userId) {
    gtag("event", "tap_other_profile", { target_user_id: userId });
  },
  tapMyReviewBeer(beer) {
    gtag("event", "tap_my_review_beer", {
      beer_id:   beer.id,
      beer_name: beer.name,
    });
  },
  tapShowAllReviews() {
    gtag("event", "tap_show_all_reviews");
  },

  /* ── 다운로드 CTA (나중에 사용) ───────────── */
  downloadCtaView(screen) {
    gtag("event", "download_cta_view", { screen });
  },
  downloadCtaClick(screen) {
    gtag("event", "download_cta_click", {
      screen,
      event_category: "conversion",
    });
  },
};
