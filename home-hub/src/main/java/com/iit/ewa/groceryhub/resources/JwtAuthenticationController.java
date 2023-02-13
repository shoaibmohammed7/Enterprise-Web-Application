package com.iit.ewa.groceryhub.resources;

import com.iit.ewa.groceryhub.entity.UserInfo;
import com.iit.ewa.groceryhub.model.JwtRequest;
import com.iit.ewa.groceryhub.model.JwtResponse;
import com.iit.ewa.groceryhub.service.JwtAuthenticationService;
import com.iit.ewa.groceryhub.service.UserInfoService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@AllArgsConstructor
@Slf4j
@RequestMapping(value = "/token", method = RequestMethod.POST)
public class JwtAuthenticationController {

	private final JwtAuthenticationService jwtAuthenticationService;
	private UserInfoService userInfoService;

	@GetMapping
	public ResponseEntity<JwtResponse> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) {
		JwtResponse response = new JwtResponse();
		try {
			response = jwtAuthenticationService.authenticateCreateToken(authenticationRequest);
		} catch (Exception e) {
			return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@GetMapping("register")
	public UserInfo createUserInfo(@RequestBody UserInfo userInfo) {
		return userInfoService.createUser(userInfo);
	}

}
