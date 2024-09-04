package kr.or.iei.member.model.dao;

import org.apache.ibatis.annotations.Mapper;

import kr.or.iei.member.model.dto.MemberDTO;

@Mapper
public interface MemberDao {

	int insertMember(MemberDTO member);

	int checkId(String memberId);

	MemberDTO selectOneMember(String string);

	int updateMember(MemberDTO member);

	int changePw(MemberDTO member);

	int deleteMember(String memberId);

}
