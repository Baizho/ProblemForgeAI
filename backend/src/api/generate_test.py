import sys
import random
import uuid

def generate_random_case():
  return random.randint(1, 10), random.randint(1, 10)

def generate_edge_case():
  options = [(1, 1), (1, 10), (10, 1), (10, 10)]
  return random.choice(options)

def generate_test_cases(num_cases):
  file_names = []
  edge_cases = int(num_cases * 0.05)
  edge_cases = max(edge_cases, 1)
  random_cases = num_cases - edge_cases

  for i in range(random_cases):
    apples, pears = generate_random_case()
    file_name = f"test_{str(uuid.uuid4())}.txt"
    with open(file_name, "w") as f:
      f.write(f"{apples} {pears}\n")
    file_names.append(file_name)

  for i in range(edge_cases):
    apples, pears = generate_edge_case()
    file_name = f"test_{str(uuid.uuid4())}.txt"
    with open(file_name, "w") as f:
      f.write(f"{apples} {pears}\n")
    file_names.append(file_name)

  return file_names

if __name__ == "__main__":
  num_cases = int(sys.argv[1])
  file_names = generate_test_cases(num_cases)
  print(file_names)
