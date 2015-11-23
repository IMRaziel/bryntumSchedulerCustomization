
-- --------------------------------------------------
-- Entity Designer DDL Script for SQL Server 2005, 2008, 2012 and Azure
-- --------------------------------------------------
-- Date Created: 11/23/2015 20:11:56
-- Generated from EDMX file: Z:\Bryntum-4.x-45d-trial\scheduler-4.0.1-trial\examples\ASP.NET CRUD demo\BryntumScheduler\Entities.edmx
-- --------------------------------------------------

SET QUOTED_IDENTIFIER OFF;
GO
USE [bryntum_scheduler];
GO
IF SCHEMA_ID(N'dbo') IS NULL EXECUTE(N'CREATE SCHEMA [dbo]');
GO

-- --------------------------------------------------
-- Dropping existing FOREIGN KEY constraints
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[FK_events_resources]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Events] DROP CONSTRAINT [FK_events_resources];
GO
IF OBJECT_ID(N'[dbo].[FK_Room_inherits_Resource]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Resources_Room] DROP CONSTRAINT [FK_Room_inherits_Resource];
GO
IF OBJECT_ID(N'[dbo].[FK_RoomBooking_inherits_Event]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Events_RoomBooking] DROP CONSTRAINT [FK_RoomBooking_inherits_Event];
GO
IF OBJECT_ID(N'[dbo].[FK_RoomBookingGuest]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Events_RoomBooking] DROP CONSTRAINT [FK_RoomBookingGuest];
GO

-- --------------------------------------------------
-- Dropping existing tables
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[Events]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Events];
GO
IF OBJECT_ID(N'[dbo].[Events_RoomBooking]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Events_RoomBooking];
GO
IF OBJECT_ID(N'[dbo].[Guests]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Guests];
GO
IF OBJECT_ID(N'[dbo].[Options]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Options];
GO
IF OBJECT_ID(N'[dbo].[Resources]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Resources];
GO
IF OBJECT_ID(N'[dbo].[Resources_Room]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Resources_Room];
GO

-- --------------------------------------------------
-- Creating all tables
-- --------------------------------------------------

-- Creating table 'Events'
CREATE TABLE [dbo].[Events] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Name] varchar(255)  NULL,
    [StartDate] datetime  NULL,
    [EndDate] datetime  NULL,
    [resourceId] int  NOT NULL,
    [Resizable] bit  NOT NULL,
    [Draggable] bit  NOT NULL,
    [Сls] varchar(255)  NULL
);
GO

-- Creating table 'Options'
CREATE TABLE [dbo].[Options] (
    [Name] varchar(45)  NOT NULL,
    [Value] varchar(45)  NULL,
    [dt] datetime  NULL
);
GO

-- Creating table 'Resources'
CREATE TABLE [dbo].[Resources] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Name] varchar(255)  NULL
);
GO

-- Creating table 'Guests'
CREATE TABLE [dbo].[Guests] (
    [GuestId] int IDENTITY(1,1) NOT NULL,
    [Name] nvarchar(max)  NOT NULL
);
GO

-- Creating table 'Events_RoomBooking'
CREATE TABLE [dbo].[Events_RoomBooking] (
    [RoomType] smallint  NOT NULL,
    [RoomStatus] smallint  NOT NULL,
    [Price] decimal(18,4)  NOT NULL,
    [GuestId] int  NOT NULL,
    [Id] int  NOT NULL
);
GO

-- Creating table 'Resources_Room'
CREATE TABLE [dbo].[Resources_Room] (
    [Id] int  NOT NULL
);
GO

-- --------------------------------------------------
-- Creating all PRIMARY KEY constraints
-- --------------------------------------------------

-- Creating primary key on [Id] in table 'Events'
ALTER TABLE [dbo].[Events]
ADD CONSTRAINT [PK_Events]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Name] in table 'Options'
ALTER TABLE [dbo].[Options]
ADD CONSTRAINT [PK_Options]
    PRIMARY KEY CLUSTERED ([Name] ASC);
GO

-- Creating primary key on [Id] in table 'Resources'
ALTER TABLE [dbo].[Resources]
ADD CONSTRAINT [PK_Resources]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [GuestId] in table 'Guests'
ALTER TABLE [dbo].[Guests]
ADD CONSTRAINT [PK_Guests]
    PRIMARY KEY CLUSTERED ([GuestId] ASC);
GO

-- Creating primary key on [Id] in table 'Events_RoomBooking'
ALTER TABLE [dbo].[Events_RoomBooking]
ADD CONSTRAINT [PK_Events_RoomBooking]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'Resources_Room'
ALTER TABLE [dbo].[Resources_Room]
ADD CONSTRAINT [PK_Resources_Room]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- --------------------------------------------------
-- Creating all FOREIGN KEY constraints
-- --------------------------------------------------

-- Creating foreign key on [resourceId] in table 'Events'
ALTER TABLE [dbo].[Events]
ADD CONSTRAINT [FK_events_resources]
    FOREIGN KEY ([resourceId])
    REFERENCES [dbo].[Resources]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_events_resources'
CREATE INDEX [IX_FK_events_resources]
ON [dbo].[Events]
    ([resourceId]);
GO

-- Creating foreign key on [GuestId] in table 'Events_RoomBooking'
ALTER TABLE [dbo].[Events_RoomBooking]
ADD CONSTRAINT [FK_RoomBookingGuest]
    FOREIGN KEY ([GuestId])
    REFERENCES [dbo].[Guests]
        ([GuestId])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_RoomBookingGuest'
CREATE INDEX [IX_FK_RoomBookingGuest]
ON [dbo].[Events_RoomBooking]
    ([GuestId]);
GO

-- Creating foreign key on [Id] in table 'Events_RoomBooking'
ALTER TABLE [dbo].[Events_RoomBooking]
ADD CONSTRAINT [FK_RoomBooking_inherits_Event]
    FOREIGN KEY ([Id])
    REFERENCES [dbo].[Events]
        ([Id])
    ON DELETE CASCADE ON UPDATE NO ACTION;
GO

-- Creating foreign key on [Id] in table 'Resources_Room'
ALTER TABLE [dbo].[Resources_Room]
ADD CONSTRAINT [FK_Room_inherits_Resource]
    FOREIGN KEY ([Id])
    REFERENCES [dbo].[Resources]
        ([Id])
    ON DELETE CASCADE ON UPDATE NO ACTION;
GO

-- --------------------------------------------------
-- Script has ended
-- --------------------------------------------------