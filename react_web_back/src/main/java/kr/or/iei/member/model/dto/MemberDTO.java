package kr.or.iei.member.model.dto;

import lombok.Data;

import org.apache.ibatis.type.Alias;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="mebmer")
@Schema(description = "회원객체")
public class MemberDTO {
	@Schema(description = "회원아이디", type = "String")
	private String memberId;
	@Schema(description = "회원비밀번호", type = "String")
	private String memberPw;
	@Schema(description = "회원이름", type = "String")
	private String memberName;
	@Schema(description = "회원전화번호", type = "String")
	private String memberPhone;
	@Schema(description = "회원분류", type = "number")
	private int memberType;
}
