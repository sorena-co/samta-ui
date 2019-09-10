package ir.donyapardaz.niopdc.config;

import ir.donyapardaz.niopdc.config.oauth2.OAuth2JwtAccessTokenConverter;
import ir.donyapardaz.niopdc.config.oauth2.OAuth2Properties;
import ir.donyapardaz.niopdc.security.oauth2.OAuth2SignatureVerifierClient;
import ir.donyapardaz.niopdc.security.AuthoritiesConstants;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.cloud.client.loadbalancer.RestTemplateCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.security.oauth2.provider.token.store.JwtAccessTokenConverter;
import org.springframework.security.oauth2.provider.token.store.JwtTokenStore;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.csrf.CsrfFilter;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.client.RestTemplate;

@Configuration
@EnableResourceServer
@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true)
public class MicroserviceSecurityConfiguration extends ResourceServerConfigurerAdapter {
    private final OAuth2Properties oAuth2Properties;

    private final CorsFilter corsFilter;

    public MicroserviceSecurityConfiguration(OAuth2Properties oAuth2Properties, CorsFilter corsFilter) {
        this.oAuth2Properties = oAuth2Properties;
        this.corsFilter = corsFilter;
    }

    @Override
    public void configure(HttpSecurity http) throws Exception {
        http
            .csrf()
            .ignoringAntMatchers("/niopdcbase/api/customers/exist")
            .ignoringAntMatchers("/niopdcpayment/validate")
            .ignoringAntMatchers("/niopdcpayment/jersey/tcc/**")
            .ignoringAntMatchers("/niopdcorder/jersey/tcc/**")
            .ignoringAntMatchers("/niopdcbase/api/news/remain-time/*")
            .ignoringAntMatchers("/niopdcbase/api/person/register/**")
            .ignoringAntMatchers("/niopdcbase/api/customers/old-customer/**")
            .ignoringAntMatchers("/h2-console/**")
            .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
        .and()
            .addFilterBefore(corsFilter, CsrfFilter.class)
            .headers()
            .frameOptions()
            .disable()
        .and()
            .sessionManagement()
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        .and()
            .authorizeRequests()
            .antMatchers("/api/**").authenticated()
            .antMatchers("/api/profile-info").permitAll()
            .antMatchers("/niopdcbase/api/news/remain-time/*").permitAll()
            .antMatchers("/niopdcbase/api/person/register/**").permitAll()
            .antMatchers("/niopdcbase/api/customers/old-customer/**").permitAll()
            .antMatchers("/niopdcbase/api/customers/exist/**").permitAll()
            .antMatchers("/management/health").permitAll()
            .antMatchers("/management/**").hasAuthority(AuthoritiesConstants.ADMIN)
            .antMatchers("/swagger-resources/configuration/ui").permitAll();
    }

    @Bean
    public TokenStore tokenStore(JwtAccessTokenConverter jwtAccessTokenConverter) {
        return new JwtTokenStore(jwtAccessTokenConverter);
    }

    @Bean
    public JwtAccessTokenConverter jwtAccessTokenConverter(OAuth2SignatureVerifierClient signatureVerifierClient) {
        return new OAuth2JwtAccessTokenConverter(oAuth2Properties, signatureVerifierClient);
    }

    @Bean
	@Qualifier("loadBalancedRestTemplate")
    public RestTemplate loadBalancedRestTemplate(RestTemplateCustomizer customizer) {
        RestTemplate restTemplate = new RestTemplate();
        customizer.customize(restTemplate);
        return restTemplate;
    }

    @Bean
    @Qualifier("vanillaRestTemplate")
    public RestTemplate vanillaRestTemplate() {
        return new RestTemplate();
    }
}
