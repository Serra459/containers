import ErrorRepository from "../error-repository";

describe('ErrorRepository', () => {
  let errorRepo;

  beforeEach(() => {
    errorRepo = new ErrorRepository();
    errorRepo.addError(404, 'Not Found');
    errorRepo.addError(500, 'Internal Server Error');
    errorRepo.addError(403, 'Forbidden');
  });

  test('should initialize with empty Map', () => {
    const newRepo = new ErrorRepository();
    expect(newRepo.errors).toBeInstanceOf(Map);
    expect(newRepo.errors.size).toBe(0);
  });

  describe('addError method', () => {
    test('should add errors to the repository', () => {
      expect(errorRepo.errors.size).toBe(3);
      expect(errorRepo.errors.get(404)).toBe('Not Found');
      expect(errorRepo.errors.get(500)).toBe('Internal Server Error');
      expect(errorRepo.errors.get(403)).toBe('Forbidden');
    });

    test('should overwrite existing error description', () => {
      errorRepo.addError(404, 'Page Not Found');
      expect(errorRepo.errors.get(404)).toBe('Page Not Found');
      expect(errorRepo.errors.size).toBe(3);
    });
  });

  describe('translate method', () => {
    test('should return correct description for existing code', () => {
      expect(errorRepo.translate(404)).toBe('Not Found');
      expect(errorRepo.translate(500)).toBe('Internal Server Error');
      expect(errorRepo.translate(403)).toBe('Forbidden');
    });

    test('should return "Unknown error" for non-existent code', () => {
      expect(errorRepo.translate(400)).toBe('Unknown error');
      expect(errorRepo.translate(0)).toBe('Unknown error');
      expect(errorRepo.translate(-1)).toBe('Unknown error');
      expect(errorRepo.translate(999)).toBe('Unknown error');
    });

    test('should work with empty repository', () => {
      const emptyRepo = new ErrorRepository();
      expect(emptyRepo.translate(404)).toBe('Unknown error');
    });
  });
});