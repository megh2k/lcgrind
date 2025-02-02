export const languageStats = `query languageStats($username: String!) {
    matchedUser(username: $username) {
      languageProblemCount {
        languageName
        problemsSolved
      }
    }
  }`


// const date = new Date("2025/01/01");
// export const startDate = date.toISOString().split('T')[0];

export const userProfileCalendar = `query userProfileCalendar($username: String!, $year: Int) {
  matchedUser(username: $username) {
    userCalendar(year: $year) {
      activeYears
      streak
      totalActiveDays
      submissionCalendar
    }
  }
}`

const today = new Date();
export const starDateHeatMap = new Date(today.getFullYear(), today.getMonth() - 6, 1);
const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());
export const todayDate = todayMidnight.toISOString().split('T')[0];

export const recentAcSubmissions = `query recentAcSubmissions($username: String!, $limit: Int!) {
  recentAcSubmissionList(username: $username, limit: $limit) {
    id
    title
    titleSlug
    timestamp
  }
}`


export const checkUserNameLeetcodeExistsQuery = `query userPublicProfile($username: String!) {
  matchedUser(username: $username) {
    username
  }
}`

export const questionDifficulty = `query questionTitle($titleSlug: String!) {
  question(titleSlug: $titleSlug) {
    difficulty
  }
}`