public interface Vehicle {
    void move();
}

public class Car implements Vehicle {
    @Override
    void move() {
        System.out.prinln("Move by Car");
    }
}

public class Train implements Vehicle {
    @Override
    void move() {
        System.out.prinln("Move by Train");
    }
}

public class Travel {
    Vehicle v;
    
    public Travel(Vehicle v) {
        this.v = v;
    }

    void startJourney() {
        v.move();
    }
}