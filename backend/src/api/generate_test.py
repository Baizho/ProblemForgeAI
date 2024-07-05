import sys
import random
import uuid

def random_case(n, x):
    a = sorted([random.randint(-10**9, 10**9) for _ in range(n)])
    return f"{n} {x}\n{' '.join(map(str, a))}\n"

def edge_case(n, x):
    if n == 1:
        return f"1 {x}\n{x}\n"
    elif x == -10**9:
        return f"{n} {x}\n{' '.join(map(str, [x] + [random.randint(x + 1, 10**9) for _ in range(n - 1)]))}\n"
    elif x == 10**9:
        return f"{n} {x}\n{' '.join(map(str, [random.randint(-10**9, x - 1) for _ in range(n - 1)] + [x]))}\n"
    elif n == 10**5:
        return f"{n} {x}\n{' '.join(map(str, [random.randint(-10**9, x - 1) for _ in range(n // 2)] + [x] + [random.randint(x + 1, 10**9) for _ in range(n // 2)]))}\n"
    else:
        return random_case(n, x)

def generate_test_cases(num_cases):
    file_names = []
    edge_cases = max(1, int(num_cases * 0.05))
    random_cases = num_cases - edge_cases

    for i in range(edge_cases):
        n = random.randint(1, 10**5)
        x = random.randint(-10**9, 10**9)
        file_name = f"test_{str(uuid.uuid4())}.txt"
        with open(file_name, 'w') as f:
            f.write(edge_case(n, x))
        file_names.append(file_name)

    for i in range(random_cases):
        n = random.randint(1, 10**5)
        x = random.randint(-10**9, 10**9)
        file_name = f"test_{str(uuid.uuid4())}.txt"
        with open(file_name, 'w') as f:
            f.write(random_case(n, x))
        file_names.append(file_name)

    return file_names

if __name__ == '__main__':
    num_cases = int(sys.argv[1])
    file_names = generate_test_cases(num_cases)
    print(file_names)
