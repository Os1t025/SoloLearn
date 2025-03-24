import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class HintDAO {

    public List<Hint> getHintsByLessonId(String lessonId) {
        List<Hint> hints = new ArrayList<>();

        String sql = "SELECT hint_id, lesson_id, hint_text FROM hints WHERE lesson_id = ?";

        try (Connection conn = DBConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, lessonId);

            ResultSet rs = stmt.executeQuery();

            while (rs.next()) {
                Hint hint = new Hint(
                    rs.getInt("hint_id"),
                    rs.getString("lesson_id"),
                    rs.getString("hint_text")
                );
                hints.add(hint);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return hints;
    }
}
