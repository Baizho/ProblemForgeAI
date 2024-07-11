import sys
import random
import uuid

def generate_random_case():
  a = random.randint(1, 1000)
  b = random.randint(1, 1000)
  return f"{a}\n{b}\n"

def generate_edge_case():
  cases = [
    (1, 1),
    (1000, 1),
    (1, 1000),
    (1000, 1000),
  ]
  return f"{cases[random.randint(0, len(cases) - 1)][0]}\n{cases[random.randint(0, len(cases) - 1)][1]}\n"

def generate_test_cases(num_cases):
  file_names = []
  edge_case_count = max(1, int(num_cases * 0.05))
  random_case_count = num_cases - edge_case_count

  for i in range(edge_case_count):
    file_name = f"test_{str(uuid.uuid4())}.txt"
    with open(file_name, 'w') as f:
      f.write(generate_edge_case())
    file_names.append(file_name)

  for i in range(random_case_count):
    file_name = f"test_{str(uuid.uuid4())}.txt"
    with open(file_name, 'w') as f:
      f.write(generate_random_case())
    file_names.append(file_name)

  return file_names

if __name__ == "__main__":
  num_cases = int(sys.argv[1])
  file_names = generate_test_cases(num_cases)
  print(file_names)
