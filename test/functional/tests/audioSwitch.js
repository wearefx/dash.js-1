/**
AUDIO_SWITCH:
- load test page
- load stream
- for each audio track:
    - switch audio track
    - check new current audio track
    - check if playback progressing
**/
const intern = require('intern').default;
const { suite, before, test, after } = intern.getPlugin('interface.tdd');
const { assert } = intern.getPlugin('chai');

const constants = require('./scripts/constants.js');
const utils = require('./scripts/utils.js');
const player = require('./scripts/player.js');

// Suite name
const NAME = 'AUDIO_SWITCH';

// test constants
const SWITCH_WAIT = 3;

exports.register = function (stream) {

    suite(utils.testName(NAME, stream), (suite) => {

        before(async ({ remote }) => {
            if (!stream.available || stream.audioTracks.length <= 1) suite.skip();
            utils.log(NAME, 'Load stream');
            command = remote.get(intern.config.testPage);
            await command.execute(player.loadStream, [stream]);
            await command.executeAsync(player.isPlaying, [constants.EVENT_TIMEOUT]);
        });

        test('switch audio track', async () => {
            // Select each track and check if new selected track is correct
            for (let i = 0; i < stream.audioTracks.length; i++) {
                // Select audio track
                utils.log(NAME, 'switch audio track: ' + stream.audioTracks[i].lang);
                await command.execute(player.setCurrentTrack, [stream.audioTracks[i]]);

                // Wait
                await command.sleep(SWITCH_WAIT * 1000);

                // Check if new current track is correct
                const newTrack = await command.execute(player.getCurrentTrackFor, ['audio']);
                utils.log(NAME, 'current audio track: ' + newTrack.lang);
                assert.deepEqual(newTrack, stream.audioTracks[i]);

                utils.log(NAME, 'Check if playing');
                const progressing = await command.executeAsync(player.isProgressing, [constants.PROGRESS_DELAY, constants.EVENT_TIMEOUT]);
                assert.isTrue(progressing);
            }
        });
    });
}
