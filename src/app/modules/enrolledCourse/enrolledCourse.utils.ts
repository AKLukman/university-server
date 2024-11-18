export const calculateGradePoints = (totalMarks: number) => {
  let result = {
    grade: 'N/A',
    gradePoints: 0,
  }

  if (totalMarks >= 0 && totalMarks <= 39) {
    result = {
      grade: 'F',
      gradePoints: 0.0,
    }
  } else if (totalMarks >= 40 && totalMarks <= 45) {
    result = {
      grade: 'D',
      gradePoints: 2.0,
    }
  } else if (totalMarks >= 50 && totalMarks <= 55) {
    result = {
      grade: 'C',
      gradePoints: 2.5,
    }
  } else if (totalMarks >= 56 && totalMarks <= 59) {
    result = {
      grade: 'C+',
      gradePoints: 2.7,
    }
  } else if (totalMarks >= 60 && totalMarks <= 65) {
    result = {
      grade: 'B-',
      gradePoints: 2.9,
    }
  } else if (totalMarks >= 66 && totalMarks <= 69) {
    result = {
      grade: 'B',
      gradePoints: 3.0,
    }
  } else if (totalMarks >= 70 && totalMarks <= 75) {
    result = {
      grade: 'B+',
      gradePoints: 3.3,
    }
  } else if (totalMarks >= 76 && totalMarks <= 80) {
    result = {
      grade: 'A-',
      gradePoints: 3.7,
    }
  } else if (totalMarks >= 81 && totalMarks <= 100) {
    result = {
      grade: 'A',
      gradePoints: 4.0,
    }
  } else {
    result = {
      grade: 'N/A',
      gradePoints: 0,
    }
  }

  return result
}
