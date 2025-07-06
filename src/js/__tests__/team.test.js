import Team from '../team';
import Character from '../character';

describe('Team class', () => {
  let team;
  let character1;
  let character2;
  let character3;

  beforeEach(() => {
    team = new Team();
    character1 = new Character('Hero 1', 'Bowman');
    character2 = new Character('Hero 2', 'Bowman');
    character3 = new Character('Hero 3', 'Bowman');
  });

  test('should initialize with empty members Set', () => {
    expect(team.members).toBeInstanceOf(Set);
    expect(team.members.size).toBe(0);
  });

  describe('add method', () => {
    test('should add a character to the team', () => {
      team.add(character1);
      expect(team.members.has(character1)).toBe(true);
      expect(team.members.size).toBe(1);
    });

    test('should throw error when adding duplicate character', () => {
      team.add(character1);
      expect(() => team.add(character1)).toThrow('Character already exists in the team');
      expect(team.members.size).toBe(1);
    });
  });

  describe('addAll method', () => {
    test('should add multiple unique characters to the team', () => {
      team.addAll(character1, character2, character3);
      expect(team.members.size).toBe(3);
      expect(team.members.has(character1)).toBe(true);
      expect(team.members.has(character2)).toBe(true);
      expect(team.members.has(character3)).toBe(true);
    });

    test('should not add duplicates when using addAll', () => {
      team.addAll(character1, character1, character2, character2);
      expect(team.members.size).toBe(2);
      expect(team.members.has(character1)).toBe(true);
      expect(team.members.has(character2)).toBe(true);
    });

    test('should work with empty arguments', () => {
      team.addAll();
      expect(team.members.size).toBe(0);
    });
  });

  describe('toArray method', () => {
    test('should convert empty Set to empty array', () => {
      expect(team.toArray()).toEqual([]);
    });

    test('should convert Set with items to array', () => {
      team.addAll(character1, character2, character3);
      const array = team.toArray();
      expect(array).toBeInstanceOf(Array);
      expect(array.length).toBe(3);
      expect(array).toContain(character1);
      expect(array).toContain(character2);
      expect(array).toContain(character3);
    });
  });
});