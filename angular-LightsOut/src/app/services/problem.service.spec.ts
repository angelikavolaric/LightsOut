import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProblemService } from './problem.service';
import { HttpClient } from '@angular/common/http';

describe('ProblemService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProblemService]
    });
  });
  
  let service: ProblemService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    service = TestBed.inject(ProblemService);
    httpMock = TestBed.inject(HttpTestingController);
  });



  

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve a problem by ID', () => {
    const mockProblem = { id: "44", size: 3, sequence: [0, 1, 0, 1, 0, 1, 1, 1 ,1]}
  
    service.getProblem('1').subscribe(problem => {
      expect(problem).toEqual(mockProblem);
    });
  
    const req = httpMock.expectOne('api/problems/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockProblem);
  });

  it('should create a new problem', () => {
    const newProblem = { id: "44", size: 3, sequence: [0, 1, 0, 1, 0, 1, 1, 1 ,1]}
    const response = { ...newProblem };
  
    service.postProblem(newProblem).subscribe(res => {
      expect(res).toEqual(response);
    });
  
    const req = httpMock.expectOne('api/problems');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newProblem);
    req.flush(response);
  });

  it('should retrieve all problems', () => {
    const mockProblems = [
      { id: "2", size: 3, sequence: [0, 1, 0, 1, 0, 1, 1, 1 ,1]},
    { id: "1", size: 3, sequence: [1, 1, 0, 0, 0, 1, 1, 0, 1] },
    ];
  
    service.getAllProblems().subscribe(problems => {
      expect(problems.length).toBe(2);
      expect(problems).toEqual(mockProblems);
    });
  
    const req = httpMock.expectOne('api/problems');
    expect(req.request.method).toBe('GET');
    req.flush(mockProblems);
  });

  it('should retrieve all problem IDs', () => {
    const mockProblems = [
      { id: "1", size: 3, sequence: [0, 1, 0, 1, 0, 1, 1, 1 ,1]},
    { id: "2", size: 3, sequence: [1, 1, 0, 0, 0, 1, 1, 0, 1] },
    ];
  
    service.getAllProblemIds().subscribe(ids => {
      expect(ids.length).toBe(2);
      expect(ids).toEqual(['1', '2']);
    });
  
    const req = httpMock.expectOne('api/problems');
    expect(req.request.method).toBe('GET');
    req.flush(mockProblems);
  });

  
  it('should handle error response', () => {
    const errorMessage = 'Server error';
  
    service.getProblem('1').subscribe({
      next: () => fail('expected an error, not a problem'),
      error: error => {
        expect(error).toBeTruthy();
        expect(error.message).toContain('Something bad happened');
      }
    });
  
    const req = httpMock.expectOne('api/problems/1');
    req.flush(errorMessage, { status: 500, statusText: 'Server Error' });
  });
  afterEach(() => {
    httpMock.verify();
  });
    
});
