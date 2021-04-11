package user;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import com.sun.source.tree.IfTree;

public class UserDAO {
	
	private Connection conn;
	private PreparedStatement pstmt; //SQL injection�� ����ϱ� ���� ����
	private ResultSet rs;
	
	public UserDAO() {
		try	{
			String dbURL = "jdbc:mysql://localhost:3306/BBS?serverTimezone=Asia/Seoul&useSSL=false";
			String dbID = "root";
			String dbPassword = "root";
			Class.forName("com.mysql.cj.jdbc.Driver");
			conn = DriverManager.getConnection(dbURL, dbID, dbPassword);
		
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	} //�ϳ��� ������ ���� �α��� �õ��� �ϴ� �Լ� �ϼ� =>login action page�� �Լ��� ����� ����ڿ��� �α��� ����� �˷���.
	public int login(String userID, String userPassword) {
		String SQL = "SELECT userPassword FROM USER WHERE userID = ?"; //?�ڸ��� ID�� ������
		try {
			pstmt = conn.prepareStatement(SQL); //������ ������ SQL�� �����ϴ� �ν��Ͻ��� ������
			pstmt.setString(1, userID);
			rs = pstmt.executeQuery();//result(����� ���� �� �ִ� ��ü�� ������ ����� �־���
			if(rs.next()) {
				if(rs.getString(1).equals(userPassword))//�Է¹��� password�� �������ִ� password�� �����ϸ� return1(�α��μ��� ��ȯ)
					return 1;
				else
					return 0;
			}
			return -1;//result�� �������� ������ ���̵� ������ �˷���(-1)
		}catch (Exception e) {
			e.printStackTrace();
		}
		return -2;  //�����ͺ��̽� ������ �ǹ�
	}
	
	public int join(User user) { //UserŬ������ ���� ��������� �ϳ��� �ν��Ͻ�
		String SQL = "INSERT INTO USER VALUES (?,?,?,?,?)";
		try {
			PreparedStatement pstmt = conn.prepareStatement(SQL);
			pstmt.setString(1, user.getUserID());
			pstmt.setString(2, user.getUserPassword());
			pstmt.setString(3, user.getUserName());
			pstmt.setString(4, user.getUserGender());
			pstmt.setString(5, user.getUserEmail());
		} catch(Exception e) {
			e.printStackTrace();
		}
		return -1;
	}

}
