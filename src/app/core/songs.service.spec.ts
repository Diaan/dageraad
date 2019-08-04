// import { TestBed } from '@angular/core/testing';

// import { SongsService } from './songs.service';
// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

// describe('SongsService', () => {
//   let httpMock: HttpTestingController;
//   let service: SongsService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule],
//       providers: [
//         SongsService
//       ]
//     });

//     service = TestBed.get(SongsService);
//     httpMock = TestBed.get(HttpTestingController);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });
// });


import { createHTTPFactory } from '@netbasal/spectator';
import { SongsService } from './songs.service';

describe('SongsService', () => {
  const http = createHTTPFactory<SongsService>(SongsService, [
  ]);

  it('should get the regex for a method', () => {​
    const { dataService } = http();

    expect(dataService).toBeTruthy();
  });
});
