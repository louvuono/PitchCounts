

export default (pitchcounts) => {
    return pitchcounts
        .map((pitchcount) => pitchcount.pitches)
        .reduce((sum, value) => sum + value, 0);
};