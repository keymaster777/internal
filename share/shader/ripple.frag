// Name: Ripple
// Author: MustardOS
// Version: 2

void main() {
    vec2 uv = v_uv - 0.5;
    float r = length(uv);
    float amp = 2.0 / max(min(u_native_resolution.x, u_native_resolution.y), 1.0);
    float wave = sin(r * 18.0 - u_time * 0.045) * amp;

    gl_FragColor = vec4(texture2D(u_tex, v_uv + (uv / (r + 0.0001)) * wave).rgb, 1.0);
}
