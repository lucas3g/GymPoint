import Bee from 'bee-queue';
import MatriculationMail from '../app/jobs/MatriculationMail';
import AnswerMail from '../app/jobs/AnswerMail';
import UpdateMatriculationMail from '../app/jobs/UpdateMatriculationMail';
import redisConfig from '../config/redis';

const jobs = [MatriculationMail, AnswerMail, UpdateMatriculationMail];

class Queue {
  constructor() {
    this.queues = {};

    this.init();
  }

  init() {
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new Bee(key, {
          redis: redisConfig,
        }),
        handle,
      };
    });
  }

  add(queue, job) {
    return this.queues[queue].bee.createJob(job).save();
  }

  processQueue() {
    jobs.forEach(job => {
      const { bee, handle } = this.queues[job.key];

      bee.on('failed', this.handleFailure).process(handle);
    });
  }

  handleFailure(job, err) {
    console.log(`Queue ${job.queue.name}: FAILE`, err);
  }
}

export default new Queue();
