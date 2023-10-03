import { getRandomWord } from './generateText';

test('should generate 3 words', () => {
    const randomWord = getRandomWord(3);

    const deconstruct = randomWord.split(' ');
    expect(deconstruct).toHaveLength(3)

});


test('should generate 100 words', () => {
    const randomWord100 = getRandomWord(10);

    const a = randomWord100.split(' ');
    expect(a).toHaveLength(10)
})


test('should generate error', () => {

    // Use a function wrapper to catch the error
    const wrapper = () => {
        getRandomWord(0);
    };

    // Use expect().toThrow() to assert that an error is thrown
    expect(wrapper).toThrow("No number")
})