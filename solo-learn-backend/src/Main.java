import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        UserDAO userDAO = new UserDAO();
        Scanner scanner = new Scanner(System.in);

        System.out.println("1. Register\n2. Login\n3. Retrieve User Info");
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
        } else {
            System.out.println("Invalid option.");
        }

        scanner.close();
    }
}