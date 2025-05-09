import { MaskfyDefault, maskfy, maskfySettings } from '../src/maskfy';

describe('Maskfy', () => {
  describe('Settings', () => {
    it('Should return default options settings', () => {
      expect(maskfySettings()).toMatchObject({ mask: MaskfyDefault.Mask, reverse: MaskfyDefault.Reverse });
    });
    it('Should return with mask 999.999 format settings', () => {
      expect(maskfySettings({ mask: '999.999' })).toMatchObject({ mask: '999.999', reverse: MaskfyDefault.Reverse });
    });
    it('Should return reverse settings', () => {
      expect(maskfySettings({ reverse: true })).toMatchObject({ mask: MaskfyDefault.Mask, reverse: true });
    });
    it('Should return mask 999.999 format and reverse', () => {
      expect(maskfySettings({ mask: '999.999', reverse: true })).toMatchObject({ mask: '999.999', reverse: true });
    });
    it('Should return prefix and suffix options', () => {
      expect(maskfySettings({ prefix: 'A', suffix: 'B' })).toMatchObject({ prefix: 'A', suffix: 'B' });
    });
  });

  describe('Values with mask and values', () => {
    it('Should be correct value of car license plate', () =>
      expect(maskfy('ABC 1D23', { mask: 'AAA 9A999' })).toBe('ABC 1D23'));
    it('Should be correct value of old car license plate', () =>
      expect(maskfy('ABC-1234', { mask: 'AAA-9999' })).toBe('ABC-1234'));
  });

  describe('Values with reverse', () => {
    it('Should return mask with reverse true', () =>
      expect(maskfy('1234567890', { reverse: true })).toBe('1.234.567.890'));
    it('Should be not return with reverse mask false (default)', () =>
      expect(maskfy('1234567890', { reverse: false })).toBe('123.456.789.0'));
  });

  describe('Values without special characters', () => {
    it('Should return value with "n" digits and mask', () => {
      expect(maskfy('123')).toBe('123');
      expect(maskfy('1234')).toBe('123.4');
      expect(maskfy('123456')).toBe('123.456');
      expect(maskfy('1234567')).toBe('123.456.7');
      expect(maskfy('123456789')).toBe('123.456.789');
      expect(maskfy('1234567890')).toBe('123.456.789.0');
    });
  });

  describe('Values with special characters', () => {
    it('Should be value with dot separator correct', () => expect(maskfy('1.234')).toBe('123.4'));
    it('Should be remove prefix string in value', () => expect(maskfy('m² 123.45')).toBe('123.45'));
    it('Should be remove comma in value', () => expect(maskfy('123,456')).toBe('123.456'));
    it('Should be remove spaces in value', () => expect(maskfy('1 234 567')).toBe('123.456.7'));
  });

  describe('Mask Brazil car license plate', () => {
    it('Should be add space between new format plate', () =>
      expect(maskfy('ABC1D23', { mask: 'AAA 9A999' })).toBe('ABC 1D23'));
    it('Should be add slash between letter and number', () =>
      expect(maskfy('ABC1234', { mask: 'AAA-9999' })).toBe('ABC-1234'));
    it('Should be a slash then a space', () => expect(maskfy('ABC 1234', { mask: 'AAA-9999' })).toBe('ABC-1234'));
  });

  describe('Mask phone number', () => {
    it('Should return a phone number', () => expect(maskfy('1111 2222', { mask: '9999-9999' })).toBe('1111-2222'));
    it('Should return a cellphone number Brazilian format', () =>
      expect(maskfy('11 911112222', { mask: '(99) 99999-9999' })).toBe('(11) 91111-2222'));
    it('Should return a phone number API format', () =>
      expect(maskfy('55 11 91234-5678', { mask: '+9999999999999' })).toBe('+5511912345678'));
    it('Should return a phone number from Brazil format', () =>
      expect(maskfy('11 11112222', { mask: '(99) 9999-9999' })).toBe('(11) 1111-2222'));
    it('Should return a phone number from Brazil format + country code', () =>
      expect(maskfy('11 22 333334444', { mask: '+99 (99) 99999-9999' })).toBe('+11 (22) 33333-4444'));
    it('Should return a phone number from USA', () =>
      expect(maskfy('111 2223333', { mask: '(999) 999-9999' })).toBe('(111) 222-3333'));
    it('Should return a phone number from United Kingdom', () =>
      expect(maskfy('111 2223333', { mask: '(999) 999-9999' })).toBe('(111) 222-3333'));
    it('Should return a phone number from France', () =>
      expect(maskfy('1 22334455', { mask: '9 99 99 99 99' })).toBe('1 22 33 44 55'));
    it('Should return a phone number from German', () =>
      expect(maskfy('11 222222', { mask: '99 999999' })).toBe('11 222222'));
    it('Should return a phone number from China', () =>
      expect(maskfy('11 22223333', { mask: '99 9999 9999' })).toBe('11 2222 3333'));
    it('Should return a phone number from Russia', () =>
      expect(maskfy('111 2223344', { mask: '999 999-99-99' })).toBe('111 222-33-44'));
    it('Should return a phone number from Italy', () =>
      expect(maskfy('111 2223333', { mask: '999 999 9999' })).toBe('111 222 3333'));
  });

  describe('Mask date', () => {
    it('Should return an ISO 8601 date format', () =>
      expect(maskfy('2025 02 01', { mask: '9999-99-99' })).toBe('2025-02-01'));
    it('Should return a DMY date format', () =>
      expect(maskfy('01 02 2025', { mask: '99-99-9999' })).toBe('01-02-2025'));
    it('Should return a MY date format', () => expect(maskfy('02 2025', { mask: '99-9999' })).toBe('02-2025'));
    it('Should return a DM date format', () => expect(maskfy('01 02', { mask: '99-99' })).toBe('01-02'));
    it('Should return a day and month date format', () => expect(maskfy('01 02', { mask: '99/99' })).toBe('01/02'));
    it('Should return an American date format', () =>
      expect(maskfy('01 02 2025', { mask: '99/99/9999' })).toBe('01/02/2025'));
    it('Should return a Brazilian date format', () =>
      expect(maskfy('01 02 2025', { mask: '99/99/9999' })).toBe('01/02/2025'));
    it('Should return a Germany date format', () =>
      expect(maskfy('01 02 2025', { mask: '99.99.9999' })).toBe('01.02.2025'));
    it('Should return a Japanese date format', () =>
      expect(maskfy('2025 02 01', { mask: '9999/99/99' })).toBe('2025/02/01'));
  });

  describe('Mask time', () => {
    it('Should return time HH:mm', () => expect(maskfy('1122', { mask: '99:99' })).toBe('11:22'));
    it('Should return time HH:mm:ss', () => expect(maskfy('112233', { mask: '99:99:99' })).toBe('11:22:33'));
    it('Should return time HH:mm:ss.sss', () =>
      expect(maskfy('112233444', { mask: '99:99:99.999' })).toBe('11:22:33.444'));
    it('Should return time with timezone', () =>
      expect(maskfy('11 22 33 01:30', { mask: '99:99:99+99:99' })).toBe('11:22:33+01:30'));
  });

  describe('Mask with modifier string', () => {
    it('Should return with prefix price (US$)', () =>
      expect(maskfy('12345678', { mask: '999,999,999.99', reverse: true, prefix: 'US$ ' })).toBe('US$ 123,456.78'));
    it('Should return with prefix size by meter', () =>
      expect(maskfy('12345678', { mask: '999.999.999,99', reverse: true, prefix: 'm² ' })).toBe('m² 123.456,78'));
    it('Should return ISO 8601 date format', () =>
      expect(maskfy('2025 02 01T10:10:00', { mask: '9999-99-99T99:99:99', suffix: 'Z' })).toBe('2025-02-01T10:10:00Z'));
    it('Should return a Korean date format ', () =>
      expect(maskfy('2025 2 1', { mask: '9999. 9. 9', suffix: '.' })).toBe('2025. 2. 1.'));
  });
});
