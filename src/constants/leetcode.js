export const languageStats = `query languageStats($username: String!) {
    matchedUser(username: $username) {
      languageProblemCount {
        languageName
        problemsSolved
      }
    }
  }`

export const recentACSubmissions = `query recentAcSubmissions($username: String!, $limit: Int!) {
  recentAcSubmissionList(username: $username, limit: $limit) {
    id
    title
    titleSlug
    timestamp
  }
}`

const date = new Date("2025/01/01");
export const startDate = date.toISOString().split('T')[0];

export const userProfileCalendar = `query userProfileCalendar($username: String!, $year: Int) {
  matchedUser(username: $username) {
    userCalendar(year: $year) {
      activeYears
      streak
      totalActiveDays
      dccBadges {
        timestamp
        badge {
          name
          icon
        }
      }
      submissionCalendar
    }
  }
}`