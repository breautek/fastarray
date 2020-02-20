
import Jasmine = require('@breautek/jasmine');
import {SpecReporter} from 'jasmine-spec-reporter';

let jasmine = new Jasmine({
    suppressLoadErrors: false
});

const spec: string = process.argv[2] ? process.argv[2] : '**/*[sS]pec.ts';

const config: any = {
    spec_dir: 'spec',
    spec_files: [ '!**/node_modules/**', spec ],
    random: false,
    stopSpecOnExpectationFailure: false
};

jasmine.env.clearReporters();
jasmine.addReporter(<any>(new SpecReporter({
    // spec: {
    //     displayStacktrace: true,
    //     displayErrorMessages: true,
    //     displaySuccessful: false,
    //     displayFailed: true,
    //     displayPending: true,
    //     displayDuration: true
    // },
    // summary: {
    //     displayErrorMessages: true,
    //     displayStacktrace: true,
    //     displayFailed: true,
    //     displayDuration: true,
    //     displayPending: true,
    //     displaySuccessful: false
    // }
})));

jasmine.loadConfig(config);
jasmine.execute();
