const { generateOurParam } = require("../services/paramService");

describe("generateOurParam", () => {
  it("should generate a consistent hash for the same input", () => {
    const key = "shoes|google|1234";
    const version = 1;
    const hash1 = generateOurParam(key, version);
    const hash2 = generateOurParam(key, version);
    expect(hash1).toBe(hash2);
  });

  it("should generate different hashes for different versions", () => {
    const key = "shoes|google|1234";
    const hash1 = generateOurParam(key, 1);
    const hash2 = generateOurParam(key, 2);
    expect(hash1).not.toBe(hash2);
  });

  it("should generate a 12-character hash", () => {
    const key = "shoes|google|1234";
    const version = 1;
    const hash = generateOurParam(key, version);
    expect(hash.length).toBe(12);
  });
});
