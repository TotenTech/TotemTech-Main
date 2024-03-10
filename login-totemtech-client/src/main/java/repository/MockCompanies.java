package repository;

import model.Companie;

import java.util.ArrayList;
import java.util.List;

public class MockCompanies {

    List<Companie> companies;

    public MockCompanies() {
        this.companies = new ArrayList();
        this.companies.add(new Companie("MC Donald's", "mc123"));
        this.companies.add(new Companie("Madero", "madero123"));
    }

    public List<Companie> getCompanies() {
        return companies;
    }

}
