package kr.or.iei.member.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
@AllArgsConstructor
public class LoginMemberDTO {
	private String accessToken;
	private String refreshToekn;
	private String memberId;
	private int memberType;
	
}
