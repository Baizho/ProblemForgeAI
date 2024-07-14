import sys
import random
import uuid

def generate_random_case(n, k):
    return f"{n} {k}\n{' '.join(str(random.randint(1, 10**9)) for _ in range(n))}\n"

def generate_edge_case(n, k):
    if random.random() < 0.5:
        n = random.randint(1, 10)
    else:
        k = random.randint(1, 10**9)
    return f"{n} {k}\n{' '.join(str(random.randint(1, 10**9)) for _ in range(n))}\n"

def generate_test_cases(num_cases):
    file_names = []
    for i in range(num_cases):
        n = random.randint(1, 10**5)
        k = random.randint(1, 10**9)
        if i < int(num_cases * 0.1):
            case = generate_edge_case(n, k)
        else:
            case = generate_random_case(n, k)
        file_name = str(uuid.uuid4()) + '.txt'
        file_names.append(file_name)
        with open(file_name, 'w') as f:
            f.write(case)
    return file_names

if __name__ == "__main__":
    num_cases = int(sys.argv[1])
    file_names = generate_test_cases(num_cases)
    print(file_names)
