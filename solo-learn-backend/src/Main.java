import java.util.Scanner;
import java.util.List;
import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        UserDAO userDAO = new UserDAO();
        Scanner scanner = new Scanner(System.in);

        System.out.println("1. Register\n2. Login\n3. Retrieve User Info\n4. View Hints");
        int choice = scanner.nextInt();
        scanner.nextLine(); // Consume newline

        if (choice == 1) { // Register
            System.out.print("Enter Username: ");
            String username = scanner.nextLine();
            System.out.print("Enter Email: ");
            String email = scanner.nextLine();
            System.out.print("Enter Password: ");
            String password = scanner.nextLine();

            boolean registered = userDAO.registerUser(username, email, password);
            if (registered) {
                System.out.println("Registration successful!");
            } else {
                System.out.println("Registration failed. Username or email may already exist.");
            }

        } else if (choice == 2) { // Login
            System.out.print("Enter Username: ");
            String username = scanner.nextLine();
            System.out.print("Enter Password: ");
            String password = scanner.nextLine();

            boolean authenticated = userDAO.authenticateUser(username, password);
            if (authenticated) {
                System.out.println("Login successful! Welcome, " + username);
            } else {
                System.out.println("Invalid username or password.");
            }

        } else if (choice == 3) { // Retrieve User Info
            System.out.print("Enter Username: ");
            String username = scanner.nextLine();

            User user = userDAO.getUserByUsername(username);
            if (user != null) {
                System.out.println("User ID: " + user.getUserId());
                System.out.println("Username: " + user.getUsername());
                System.out.println("Email: " + user.getEmail());
            } else {
                System.out.println("User not found.");
            }

        } else if (choice == 4) { // View Hints
            List<Hint> hints = new ArrayList<>();
            hints.add(new Hint(1, "1", "This is a dummy hint."));
            hints.add(new Hint(2, "1", "Remember to review your notes."));
            hints.add(new Hint(3, "2", "You can always ask questions in class."));

            System.out.println("Hints:");
            for (Hint hint : hints) {
                System.out.println("- " + hint.getHintText());
            }
        }

        scanner.close();
    }
}


