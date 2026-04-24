// Name: Ripple
// Author: MustardOS
// Version: 1

void main() {
    vec2 uv = v_uv - 0.5;
    float r = length(uv);
    float wave = sin(r * 18.0 - u_time * 0.045) * 0.008;

    gl_FragColor = vec4(texture2D(u_tex, v_uv + (uv / (r + 0.0001)) * wave).rgb, 1.0);
}
