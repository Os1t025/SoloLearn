public class UserScore {
    private String username;
    private int totalScore;

    public UserScore(String username, int totalScore) {
        this.username = username;
        this.totalScore = totalScore;
    }

    public String getUsername() {
        return username;
    }

    public int getTotalScore() {
        return totalScore;
    }
}
