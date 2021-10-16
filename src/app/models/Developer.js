module.exports = (sequelize, DataTypes) => {
    
    const developer = sequelize.define(
        'developer', 
        {
            name: DataTypes.STRING,
            sex: DataTypes.STRING,
            age: DataTypes.INTEGER,
            hobby: DataTypes.STRING,
            birthdate: DataTypes.DATE,
        }
    );

    return developer;
};