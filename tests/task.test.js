// Dev Dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

const server = require('../index');
// const app = require('../app');

chai.use(chaiHttp);

const baseUrl = 'http://localhost:8089/api/v1';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYxMjJkMmVlNmYyOTM3NWRiMDE1YTZmOCIsImVtYWlsIjoiY2FyZWVycy5qb3NlcGh1dHVsdUBnbWFpbC5jb20ifSwiaWF0IjoxNjI5NjcyNjY5fQ.Dz73OgiNPVsQ9aCSRAHMz64ZahZNtmMp1BS4L44FORs';

describe('Task Tests', () => {

  beforeEach((done) => {
    done();
  });

  /**
   * Testing the /GET route for tasks
   *
   */
  describe('/GET tasks', () => {
    it('It should fail to fetch all tasks belonging to the owner with authorization error', (done) => {
      chai.request(server)
        .get('/task')
        .end((err, res) => {
          res.should.have.status(401);
          done();
        })
    });

    it('It should fetch all tasks belonging to the owner', (done) => {
      chai.request(server)
        .get('/task')
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          res.should.have.status(200);
          res.should.have.property('task').be.a('array');
          // res.should.have.be.a('array');
          // res.body.length.should.be.eql(0);
          done();
        })
    })
  });

  // describe('/POST task', () => {
  //   it('it should not POST a task without a description field', (done) => {
  //       let task = {
  //           title: "The Lord of the Rings",
  //           due_date: "2021-08-22T23:11:18.206Z",
  //           notification_time: "2021-08-22T23:11:18.206Z"
  //       }
  //         chai.request(server)
  //         .post('/task')
  //         .set({ Authorization: `Bearer ${token}` })
  //         .send(task)
  //         .end((err, res) => {
  //               res.should.have.status(404);
  //               res.body.should.be.a('object');
  //               res.body.should.have.property('errors');
  //               res.body.errors.should.have.property('description');
  //               res.body.errors.pages.should.have.property('kind').eql('required');
  //           done();
  //         });
  //   });
  //   // it('it should POST a book ', (done) => {
  //   //     let book = {
  //   //         title: "The Lord of the Rings",
  //   //         author: "J.R.R. Tolkien",
  //   //         year: 1954,
  //   //         pages: 1170
  //   //     }
  //   //       chai.request(server)
  //   //       .post('/book')
  //   //       .send(book)
  //   //       .end((err, res) => {
  //   //             res.should.have.status(200);
  //   //             res.body.should.be.a('object');
  //   //             res.body.should.have.property('message').eql('Book successfully added!');
  //   //             res.body.book.should.have.property('title');
  //   //             res.body.book.should.have.property('author');
  //   //             res.body.book.should.have.property('pages');
  //   //             res.body.book.should.have.property('year');
  //   //         done();
  //   //       });
  //   // });
  // });

  // describe('/GET/:id book', () => {
  //   it('it should GET a book by the given id', (done) => {
  //       let book = new Book({ title: "The Lord of the Rings", author: "J.R.R. Tolkien", year: 1954, pages: 1170 });
  //       book.save((err, book) => {
  //           chai.request(server)
  //         .get('/book/' + book.id)
  //         .send(book)
  //         .end((err, res) => {
  //               res.should.have.status(200);
  //               res.body.should.be.a('object');
  //               res.body.should.have.property('title');
  //               res.body.should.have.property('author');
  //               res.body.should.have.property('pages');
  //               res.body.should.have.property('year');
  //               res.body.should.have.property('_id').eql(book.id);
  //           done();
  //         });
  //       });

  //   });
  // });

  // describe('/PUT/:id book', () => {
  //   it('it should UPDATE a book given the id', (done) => {
  //       let book = new Book({title: "The Chronicles of Narnia", author: "C.S. Lewis", year: 1948, pages: 778})
  //       book.save((err, book) => {
  //             chai.request(server)
  //             .put('/book/' + book.id)
  //             .send({title: "The Chronicles of Narnia", author: "C.S. Lewis", year: 1950, pages: 778})
  //             .end((err, res) => {
  //                   res.should.have.status(200);
  //                   res.body.should.be.a('object');
  //                   res.body.should.have.property('message').eql('Book updated!');
  //                   res.body.book.should.have.property('year').eql(1950);
  //               done();
  //             });
  //       });
  //   });
  // });

  /*
  * Test the /DELETE/:id route
  */
  // describe('/DELETE/:id book', () => {
  //   it('it should DELETE a book given the id', (done) => {
  //       let book = new Book({title: "The Chronicles of Narnia", author: "C.S. Lewis", year: 1948, pages: 778})
  //       book.save((err, book) => {
  //             chai.request(server)
  //             .delete('/book/' + book.id)
  //             .end((err, res) => {
  //                   res.should.have.status(200);
  //                   res.body.should.be.a('object');
  //                   res.body.should.have.property('message').eql('Book successfully deleted!');
  //                   res.body.result.should.have.property('ok').eql(1);
  //                   res.body.result.should.have.property('n').eql(1);
  //               done();
  //             });
  //       });
  //   });
  // });
});