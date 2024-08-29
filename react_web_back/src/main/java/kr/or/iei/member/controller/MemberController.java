package kr.or.iei.member.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.tags.Tag;
import kr.or.iei.member.model.service.MemberService;


@RestController
@RequestMapping(value="/member")
@CrossOrigin("*")
@Tag(name="MEMBER",description = "MEMBER API")
public class MemberController {
	@Autowired
	MemberService memberService;
}
