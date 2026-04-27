// Name: Fish Eye - Normal
// Author: MustardOS
// Version: 2

void main() {
    const float STRENGTH = 0.45;

    vec2 uv = v_uv * 2.0 - 1.0;
    vec2 asuv = uv * vec2(u_resolution.x / u_resolution.y, 1.0);
    float r = length(asuv);

    float warp = 1.0 - STRENGTH * (r * r);
    vec2 warped = uv * warp * 0.5 + 0.5;

    if (warped.x <= 0.0 || warped.x >= 1.0 || warped.y <= 0.0 || warped.y >= 1.0) {
        gl_FragColor = vec4(0.0);
        return;
    }

    vec3 col = texture2D(u_tex, warped).rgb;
    col *= clamp(1.0 - r * r * 0.5, 0.0, 1.0);

    gl_FragColor = vec4(col, 1.0);
}
