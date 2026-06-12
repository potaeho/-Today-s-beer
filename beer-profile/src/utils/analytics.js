// ================================================
// 오늘의 맥주 — 이벤트 트래킹 (GA + Supabase 동시 기록)
// ================================================
// 사용법: import { track } from '../utils/analytics'
//         track.screenView('HomePage')
//         track.tapBeer({ id, name, category })
//
// 모든 이벤트는 (1) Google Analytics(gtag)와
// (2) Supabase user_events 에 동시에 적재된다.
// → GA는 실시간 대시보드, Supabase는 원본 로그/퍼널 쿼리용.

import { logEvent } from "../lib/track";

const gtag = (...args) => {
  if (typeof window !== "undefined" && window.gtag) window.gtag(...args);
};

// gtag 이벤트 + Supabase user_events 동시 기록
function ev(gaEvent, gaParams, sb) {
  gtag("event", gaEvent, gaParams);
  // sb: { screen, action, targetId, targetType, meta }
  if (sb) logEvent(sb.screen, sb.action, sb);
}

export const track = {

  /* ── 앱/화면 진입 ─────────────────────────── */
  appOpen() {
    ev("app_open", {}, { screen: "app", action: "open" });
  },
  screenView(screenName) {
    ev("screen_view", { screen_name: screenName },
      { screen: screenName, action: "view" });
  },
  tabChange(tab) {
    ev("tab_change", { tab_name: tab },
      { screen: tab, action: "tab_change", meta: { tab } });
  },

  /* ── 홈 화면 ──────────────────────────────── */
  tapRecommendedBeer(beer) {
    ev("tap_recommended_beer",
      { beer_id: beer.id, beer_name: beer.name, beer_category: beer.category },
      { screen: "home", action: "tap_recommended_beer", targetId: beer.id, targetType: "beer", meta: { name: beer.name, category: beer.category } });
  },
  tapDrinkBtn(beer) {
    ev("tap_drink_btn", { beer_id: beer.id, beer_name: beer.name },
      { screen: "home", action: "tap_drink_btn", targetId: beer.id, targetType: "beer", meta: { name: beer.name } });
  },
  tapNews(newsTitle) {
    ev("tap_news", { news_title: newsTitle },
      { screen: "home", action: "tap_news", meta: { title: newsTitle } });
  },
  tapLevelCard() {
    ev("tap_level_card", {}, { screen: "home", action: "tap_level_card" });
  },
  tapSearchIcon() {
    ev("tap_search_icon", {}, { screen: "global", action: "tap_search_icon" });
  },
  tapBarcodeIcon() {
    ev("tap_barcode_icon", {}, { screen: "global", action: "tap_barcode_icon" });
  },

  /* ── 검색 모달 ────────────────────────────── */
  search(query, resultCount) {
    ev("search", { search_term: query, result_count: resultCount },
      { screen: "SearchModal", action: "search", meta: { query, result_count: resultCount } });
  },
  searchSelect(beer) {
    ev("search_select",
      { beer_id: beer.id, beer_name: beer.name, beer_category: beer.category },
      { screen: "SearchModal", action: "search_select", targetId: beer.id, targetType: "beer", meta: { name: beer.name } });
  },
  searchNoResult(query) {
    ev("search_no_result", { search_term: query },
      { screen: "SearchModal", action: "search_no_result", meta: { query } });
  },

  /* ── 맥주 액션 시트 ───────────────────────── */
  actionSheetOpen(beer) {
    ev("action_sheet_open", { beer_id: beer.id, beer_name: beer.name },
      { screen: "BeerActionSheet", action: "open", targetId: beer.id, targetType: "beer", meta: { name: beer.name } });
  },
  actionSheetChooseReview(beer) {
    ev("action_sheet_choose_review", { beer_id: beer.id, beer_name: beer.name },
      { screen: "BeerActionSheet", action: "choose_review", targetId: beer.id, targetType: "beer", meta: { name: beer.name } });
  },
  actionSheetChoosePost(beer) {
    ev("action_sheet_choose_post", { beer_id: beer.id, beer_name: beer.name },
      { screen: "BeerActionSheet", action: "choose_post", targetId: beer.id, targetType: "beer", meta: { name: beer.name } });
  },

  /* ── 탐색 화면 ────────────────────────────── */
  tapCategoryFilter(category) {
    ev("tap_category_filter", { category },
      { screen: "explore", action: "tap_category_filter", meta: { category } });
  },
  tapExploreBeer(beer) {
    ev("tap_explore_beer",
      { beer_id: beer.id, beer_name: beer.name, beer_category: beer.category },
      { screen: "explore", action: "tap_explore_beer", targetId: beer.id, targetType: "beer", meta: { name: beer.name } });
  },

  /* ── 맥주 상세 ────────────────────────────── */
  beerDetailView(beer) {
    ev("beer_detail_view",
      { beer_id: beer.id, beer_name: beer.name, beer_category: beer.category },
      { screen: "beer-detail", action: "view", targetId: beer.id, targetType: "beer", meta: { name: beer.name, category: beer.category } });
  },
  tapStartRating(beer) {
    ev("tap_start_rating", { beer_id: beer.id, beer_name: beer.name },
      { screen: "beer-detail", action: "tap_start_rating", targetId: beer.id, targetType: "beer", meta: { name: beer.name } });
  },

  /* ── 평가 플로우 ──────────────────────────── */
  ratingStepEnter(step, beer) {
    // step: "input" | "detail" | "result"
    ev("rating_step_enter", { step, beer_id: beer?.id, beer_name: beer?.name },
      { screen: "rating", action: "step_enter", targetId: beer?.id, targetType: "beer", meta: { step, name: beer?.name } });
  },
  ratingStepExit(step, beer) {
    ev("rating_step_exit", { step, beer_id: beer?.id, beer_name: beer?.name },
      { screen: "rating", action: "step_exit", targetId: beer?.id, targetType: "beer", meta: { step, name: beer?.name } });
  },
  ratingComplete(beer, starRating, hashtags) {
    ev("rating_complete",
      { beer_id: beer?.id, beer_name: beer?.name, beer_category: beer?.category, star_rating: starRating, hashtag_count: hashtags?.length ?? 0, hashtags: hashtags?.join(",") ?? "" },
      { screen: "rating", action: "complete", targetId: beer?.id, targetType: "beer", meta: { name: beer?.name, star_rating: starRating, hashtag_count: hashtags?.length ?? 0 } });
  },

  /* ── 커뮤니티 ─────────────────────────────── */
  tapLikePost(postId) {
    ev("tap_like_post", { post_id: postId },
      { screen: "CommunityPage", action: "tap_like_post", targetId: postId, targetType: "post" });
  },
  tapWritePost() {
    ev("tap_write_post", {}, { screen: "CommunityPage", action: "tap_write_post" });
  },
  postComplete(hasBeerTag, mediaCount) {
    ev("post_complete", { has_beer_tag: hasBeerTag, media_count: mediaCount },
      { screen: "CommunityPage", action: "post_complete", meta: { has_beer_tag: hasBeerTag, media_count: mediaCount } });
  },
  postAbandoned() {
    ev("post_abandoned", {}, { screen: "CommunityPage", action: "post_abandoned" });
  },

  /* ── 프로필 ───────────────────────────────── */
  tapFollowers() {
    ev("tap_followers", {}, { screen: "ProfilePage", action: "tap_followers" });
  },
  tapFollowing() {
    ev("tap_following", {}, { screen: "ProfilePage", action: "tap_following" });
  },
  tapOtherProfile(userId) {
    ev("tap_other_profile", { target_user_id: userId },
      { screen: "ProfilePage", action: "tap_other_profile", targetId: userId, targetType: "user" });
  },
  tapMyReviewBeer(beer) {
    ev("tap_my_review_beer", { beer_id: beer.id, beer_name: beer.name },
      { screen: "ProfilePage", action: "tap_my_review_beer", targetId: beer.id, targetType: "beer", meta: { name: beer.name } });
  },
  tapShowAllReviews() {
    ev("tap_show_all_reviews", {}, { screen: "ProfilePage", action: "tap_show_all_reviews" });
  },

  /* ── 다운로드 / 출시알림 퍼널 ─────────────── */
  downloadCtaView(screen) {
    ev("download_cta_view", { screen },
      { screen: "download_popup", action: "cta_view", meta: { from: screen } });
  },
  downloadCtaClick(screen) {
    ev("download_cta_click", { screen, event_category: "conversion" },
      { screen: "download_popup", action: "cta_click", meta: { from: screen } });
  },

  /* ── 화면 체류 시간 ───────────────────────── */
  screenTime(screenName, durationMs, meta = {}) {
    ev("screen_time",
      { screen_name: screenName, duration_ms: durationMs },
      { screen: screenName, action: "screen_time", meta: { duration_ms: durationMs, ...meta } });
  },

  /* ── 홈 추가 버튼 ──────────────────────────── */
  tapAiRecCard(beer) {
    ev("tap_ai_rec_card",
      { beer_id: beer.id, beer_name: beer.name, beer_category: beer.category },
      { screen: "home", action: "tap_ai_rec_card", targetId: beer.id, targetType: "beer", meta: { name: beer.name } });
  },
  tapMoreBtn() {
    ev("tap_more_btn", {}, { screen: "home", action: "tap_more_btn" });
  },
  tapNewsShowAll() {
    ev("tap_news_show_all", {}, { screen: "home", action: "tap_news_show_all" });
  },

  /* ── 평가 중도 포기 ────────────────────────── */
  ratingAbandon(step, beer) {
    // step: "input" | "detail"
    ev("rating_abandon", { step, beer_id: beer?.id, beer_name: beer?.name },
      { screen: "rating", action: "abandon", targetId: beer?.id, targetType: "beer", meta: { step, name: beer?.name } });
  },

  /* ── 앱 이탈 (beforeunload) ─────────────────── */
  exitApp(lastScreen) {
    // sendBeacon 기반 — 페이지 닫힐 때 fire-and-forget
    ev("exit_app", { last_screen: lastScreen },
      { screen: lastScreen, action: "exit_app" });
  },

  /* ── 범용 — 임의 이벤트 직접 기록 ─────────── */
  custom(screen, action, meta) {
    if (meta && (meta.event || meta.params)) {
      gtag("event", meta.event || action, meta.params || {});
    }
    logEvent(screen, action, { meta });
  },
};
