// Name: PC Mode - VGA
// Author: MustardOS
// Version: 1

void main() {
    const vec3 LUMA = vec3(0.299, 0.587, 0.114);

    vec3 c = texture2D(u_tex, v_uv).rgb;
    float l = dot(c, LUMA);

    vec3 cube = floor(c * 5.0 + 0.5) / 5.0;
    float v = floor(l * 23.0 + 0.5) / 23.0;

    gl_FragColor = vec4(mix(cube, vec3(v), step(0.85, l)), 1.0);
}
