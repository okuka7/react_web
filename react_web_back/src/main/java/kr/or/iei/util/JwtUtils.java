package kr.or.iei.util;


import java.util.Calendar;
import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import kr.or.iei.member.model.dto.LoginMemberDTO;

@Component
public class JwtUtils {
	@Value("${jwt.secret-key}")
	public String secretKey;
	@Value("${jwt.expire-hour}")
	public int expireHour;
	@Value("${jwt.expire-hour-refresh}")
	public int expireHourRefresh;
	
	//1시간짜리 토큰생성
	public String createAccessToken(String memberId, int memberType) {
		//1. 작성해둔 키값을 이용해서 암호화코드 생성
		SecretKey key = Keys.hmacShaKeyFor(secretKey.getBytes());
		//2. 토큰 생성시간 및 만료시간 설정
		Calendar c = Calendar.getInstance();
		Date startTime = c.getTime();
		c.add(Calendar.HOUR, expireHour);
		Date expireTime = c.getTime();
		
		String token = Jwts.builder()				//JWT생성 시작
							.issuedAt(startTime)	//토큰발행 시작시간
							.expiration(expireTime) //토큰만료 시간
							.signWith(key) 			//암호화 서명
							.claim("memberId", memberId)
							.claim("memberType", memberType)
							.compact();
		return token;
	}
	//8760짜리 토큰 발행
	public String createRefeshToken(String memberId,int memberType) {
		//1. 작성해둔 키값을 이용해서 암호화코드 생성
		SecretKey key = Keys.hmacShaKeyFor(secretKey.getBytes());
		//2. 토큰 생성시간 및 만료시간 설정
		Calendar c = Calendar.getInstance();
		Date startTime = c.getTime();
		c.add(Calendar.HOUR, expireHourRefresh);
		Date expireTime = c.getTime();
		
		String token = Jwts.builder()				//JWT생성 시작
							.issuedAt(startTime)	//토큰발행 시작시간
							.expiration(expireTime) //토큰만료 시간
							.signWith(key) 			//암호화 서명
							.claim("memberId", memberId)
							.claim("memberType", memberType)
							.compact();
		return token;
	}
	//토큰을 받아서 확인
	public LoginMemberDTO checkToken(String token) {
		//1.토큰 해석을 위한 암호화 키 세팅
		SecretKey key = Keys.hmacShaKeyFor(secretKey.getBytes());
		Claims claims = (Claims) Jwts.parser()				//토큰 해석 시작
									.verifyWith(key)		//암호화 키
									.build()			
									.parse(token)
									.getPayload();
		String memberId = (String)claims.get("memberId");
		int memberType = (int)claims.get("memberType");
		LoginMemberDTO loginMember = new LoginMemberDTO();
		loginMember.setMemberId(memberId);
		loginMember.setMemberType(memberType);
		return loginMember;
									
	}
	
}