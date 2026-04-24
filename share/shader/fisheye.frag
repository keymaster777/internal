// Name: Fish Eye - Normal
// Author: MustardOS
// Version: 1

void main() {
    const float STRENGTH = 0.45;

    vec2 uv = v_uv * 2.0 - 1.0;

    // Aspect-correct radial distance
    vec2 asuv = uv * vec2(u_resolution.x / u_resolution.y, 1.0);
    float r   = length(asuv);

    // Inverse fisheye warp — compress towards edges
    float warp = 1.0 - STRENGTH * (r * r);
    vec2  warped = uv * warp * 0.5 + 0.5;

    float inside = step(0.0, warped.x) * step(warped.x, 1.0)
                 * step(0.0, warped.y) * step(warped.y, 1.0);

    vec3 col = texture2D(u_tex, clamp(warped, 0.0, 1.0)).rgb * inside;

    // Mild vignette to soften the edge
    col *= clamp(1.0 - r * r * 0.5, 0.0, 1.0);

    gl_FragColor = vec4(col, 1.0);
}
