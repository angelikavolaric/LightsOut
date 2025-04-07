import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { InMemoryDataService } from './in-memory-data.service';
import { ProblemService } from './problem.service';

describe('InMemoryDataService', () => {
  let service: InMemoryDataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ProblemService,
        { provide: InMemoryDataService, useValue: { createDb: () => ({ problem: [] }) } }
      ]
    });
    service = TestBed.inject(InMemoryDataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should retrieve items from the API', () => {
    const mockItems = [{ id: "44", size: 3, sequence: [0, 1, 0, 1, 0, 1, 1, 1 ,1]},
    { id: "1", size: 3, sequence: [1, 1, 0, 0, 0, 1, 1, 0, 1] }];
  
    service.getAllProblems().subscribe(items => {
      expect(items.length).toBe(2);
      expect(items).toEqual(mockItems);
    });
  
    const req = httpMock.expectOne('api/problems');
    expect(req.request.method).toBe('GET');
    req.flush(mockItems);
  });


  afterEach(() => {
    httpMock.verify();
  });
});

