import sys
import random
import uuid

def generate_random_case(n, x):
    arr = [random.randint(1, 10**9) for _ in range(n)]
    return f"{n} {x}\n{' '.join(map(str, arr))}\n"

def generate_edge_case(n, x):
    if n == 1:
        return f"{n} {x}\n{x}\n"
    elif x == 1:
        return f"{n} {x}\n1 {' '.join([str(random.randint(2, 10**9)) for _ in range(n - 1)])}\n"
    else:
        return f"{n} {x}\n{' '.join([str(random.randint(1, 10**9)) for _ in range(n)])}\n"

def generate_test_cases(num_cases):
    file_names = []
    edge_case_count = max(1, int(num_cases * 0.05))
    for i in range(num_cases):
        n = random.randint(1, 10**5)
        x = random.randint(1, 10**9)
        if i < edge_case_count:
            case = generate_edge_case(n, x)
        else:
            case = generate_random_case(n, x)
        file_name = str(uuid.uuid4()) + ".txt"
        with open(file_name, 'w') as f:
            f.write(case)
        file_names.append(file_name)
    return file_names

if __name__ == "__main__":
    num_cases = int(sys.argv[1])
    file_names = generate_test_cases(num_cases)
    print(file_names)
