package kr.or.iei;

import java.util.HashSet;
import java.util.Set;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;

@Configuration
@EnableWebMvc
public class SwaggerConfig {
	private ApiInfo swaggerInfo(){
		return new ApiInfoBuilder()
				.title("ReactWeb API")
				.build();
	}
	//요청형식지정
	private Set<String> getConsumeContentType(){
		Set<String> consumes = new HashSet<String>();
		consumes.add("application/json;charset=UTF-8");
		consumes.add("application/x-www-from-urlencoded");
		return consumes;
		
	}
	//응답형식지정
	private Set<String> getProduyceContentType(){
		Set<String> produces = new HashSet<String>();
		produces.add("application/json;charset=UTF-8");
		produces.add("plain/text;charset=UTF-8");
		return produces;
	}
	
	@Bean
	public Docket swaggerApi() {
		return new Docket(DocumentationType.SWAGGER_2)
				.consumes(getConsumeContentType())
				.produces(getProduyceContentType())
				.apiInfo(swaggerInfo()).select()
				.apis(RequestHandlerSelectors.basePackage("kr.or.iei"))
				.paths(PathSelectors.any())
				.build()
				.useDefaultResponseMessages(false);
	}
}
