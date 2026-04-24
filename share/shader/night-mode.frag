// Name: Night Mode
// Author: MustardOS
// Version: 1

void main() {
    vec3 col = texture2D(u_tex, v_uv).rgb;

    float lum = dot(col, vec3(0.2126, 0.7152, 0.0722));

    vec3 warm = vec3(lum * 1.05, lum * 0.90, lum * 0.65);
    col = mix(col, warm, 0.72);

    col.r = clamp(col.r, 0.0, 1.0);
    col.g = clamp(col.g, 0.0, 1.0);
    col.b = clamp(col.b, 0.0, 1.0);

    gl_FragColor = vec4(col, 1.0);
}
