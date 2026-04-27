// Name: TV S-Video Output
// Author: MustardOS
// Version: 2

void main() {
    const float PI = 3.14159265;
    const vec3 LUMA = vec3(0.299, 0.587, 0.114);

    float px = 1.0 / max(u_native_resolution.x, 1.0);

    vec3 c0 = texture2D(u_tex, v_uv).rgb;
    vec3 c1 = texture2D(u_tex, v_uv + vec2(px, 0.0)).rgb;
    vec3 c2 = texture2D(u_tex, v_uv - vec2(px, 0.0)).rgb;

    vec3 col = mix(vec3(dot(c0, LUMA)), (c1 + c2) * 0.5, 0.6);
    col *= 0.9 + 0.1 * sin(v_uv.y * max(u_native_resolution.y, 1.0) * PI);

    gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}
