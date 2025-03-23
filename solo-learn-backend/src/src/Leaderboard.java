import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;


public class Leaderboard {
    public List<UserScore> getLeaderboard() {
        List<UserScore> leaderboard = new ArrayList<>();
        String sql = "SELECT username, SUM(COALESCE(quiz_score, 0)) AS total_score " +
                     "FROM users u JOIN user_progress up ON u.user_id = up.user_id " +
                     "GROUP BY u.username ORDER BY total_score DESC LIMIT 10";
    
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {
    
            while (rs.next()) {
                leaderboard.add(new UserScore(
                    rs.getString("username"),
                    rs.getInt("total_score")
                ));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return leaderboard;
    }
}
