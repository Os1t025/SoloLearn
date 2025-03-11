import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;


public class DBConnection {
    private static final String URL = "jdbc:mysql://localhost:3306/programming_lessons"; // Change to "jdbc:postgresql://localhost:5432/user_auth" for PostgreSQL
    private static final String USER = "root"; // Change based on your database user
    private static final String PASSWORD = "Lolsmiley13!"; // Your database password

    public static Connection getConnection() throws SQLException {
        return DriverManager.getConnection(URL, USER, PASSWORD);
    }  
}
