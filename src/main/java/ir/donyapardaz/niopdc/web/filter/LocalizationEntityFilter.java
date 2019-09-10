package ir.donyapardaz.niopdc.web.filter;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.Charset;
import java.util.List;
import java.util.Map;

import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import com.netflix.zuul.ZuulFilter;
import ir.donyapardaz.niopdc.service.utils.LocalizationUtil;
import org.springframework.util.StreamUtils;

import com.netflix.zuul.context.RequestContext;

import static com.netflix.zuul.context.RequestContext.getCurrentContext;
import static org.springframework.util.ReflectionUtils.rethrowRuntimeException;

/**
 * @author Spencer Gibb
 */
public class LocalizationEntityFilter extends ZuulFilter {
    @Override
    public String filterType() {
        return "pre";
    }

    @Override
    public int filterOrder() {
        return 1;
    }

    @Override
    public boolean shouldFilter() {
        return true;
    }

    public Object run() {
        try {
            RequestContext context = getCurrentContext();
            InputStream in = (InputStream) context.get("requestEntity");
            if (in == null) {
                in = context.getRequest().getInputStream();
            }
            String body = StreamUtils.copyToString(in, Charset.forName("UTF-8"));

            Map<String, List<String>> params = context.getRequestQueryParams();

            if (params != null)
                for (List<String> strings : params.values()) {
                    for (int i = 0; i < strings.size(); i++) {
                        strings.set(i, LocalizationUtil.CorrectionYeKe(LocalizationUtil.ConvertNumberToEnglish(strings.get(i))));
                    }
                }


            body = LocalizationUtil.ConvertNumberToEnglish(body);
            body = LocalizationUtil.CorrectionYeKe(body);
            context.set("requestEntity", new ByteArrayInputStream(body.getBytes("UTF-8")));
        } catch (IOException e) {
            rethrowRuntimeException(e);
        }
        return null;
    }


}
