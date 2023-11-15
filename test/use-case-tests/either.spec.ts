import { Either, left, right } from "@/core/either";

function doSomenthing(shoudlSuccess: boolean): Either<string, number> {
  if (shoudlSuccess) {
    return right(10);
  } else {
    return left("error");
  }
}

test("success result", () => {
  const result = doSomenthing(true);

  expect(result.isRight()).toBe(true);
});

test("error result", () => {
  const result = doSomenthing(false);

  expect(result.isLeft()).toBe(true);
});
