import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SolutionService } from './solution.service';
import { Problem } from '../problem';
import { Solution } from '../solution';
import { SolutionStep } from '../solutionStep';


describe('SolutionService', () => {
  let service: SolutionService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SolutionService]
    });
    service = TestBed.inject(SolutionService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should retrieve a solution for the given problem', () => {
    const mockProblem: Problem = { id: "44", size: 3, sequence: [0, 1, 0, 1, 0, 1, 1, 1 ,1]};
    const mockSolution: Solution = { id: "0", fkProblem: "44"};
  
    service.getSolution(mockProblem).subscribe(solution => {
      expect(solution).toEqual(mockSolution);
    });
  
    const req = httpMock.expectOne(`${service['apiUrl']}/solutions/problem/${mockProblem.id}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockSolution);
  });

  it('should retrieve solution steps for the given problem ID', () => {
    const problemId = '1';
    const mockSteps: SolutionStep[] = [ { id: "0", action: 0, actionSeq: 1, fkSolution: "0"},
      { id: "1", action: 1, actionSeq: 2, fkSolution: "0"},
      { id: "2", action: 2, actionSeq: 3, fkSolution: "0"},
      { id: "3", action: 7, actionSeq: 4, fkSolution: "0"},];
  
    service.getSolutionSteps(problemId).subscribe(steps => {
      expect(steps).toEqual(mockSteps);
    });
  
    const req = httpMock.expectOne(`${service['apiUrl']}/solutions/problem/${problemId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockSteps);
  });

  it('should handle error response gracefully', () => {
    const mockProblem: Problem = { id: "44", size: 3, sequence: [0, 1, 0, 1, 0, 1, 1, 1 ,1]};
  
    service.getSolution(mockProblem).subscribe({
      next: () => fail('expected an error, not a solution'),
      error: error => {
        expect(error).toBeTruthy();
        expect(error.message).toContain('Something bad happened');
      }
    });
  
    const req = httpMock.expectOne(`${service['apiUrl']}/solutions/problem/${mockProblem.id}`);
    req.flush('Error', { status: 500, statusText: 'Server Error' });
  });
  

  afterEach(() => {
    // Verify that there are no outstanding HTTP requests
    httpMock.verify();
  });

  // Your test cases will go here
});
